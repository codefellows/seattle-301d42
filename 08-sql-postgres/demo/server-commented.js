'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

// Load Environment from .env file
require('dotenv').config();

// Application Setup
const PORT = process.env.PORT;

// Database setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('err', err => console.log(err));

const app = express();

app.use(cors());

// Route Handlers
app.get('/location', getLocation);
app.get('/weather', getWeather);

// Errors!
function handleError(err, res) {
  console.error('ERR', err);
  if (res) res.status(500).send('Sorry, something went wrong');
}

// Start the server up on a given port
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`) );

// Helper functions and handlers

// ---------- LOCATION ------------- //

// Route Handler
// This is the callback that executes when the /location route is hit
// Therefore, it has (request, response) as parameters
function getLocation(request, response) {

  // this is an object literal with three properties:
  const locationHandler = {

    // Property #1. this is how we access what the user entered into the search field
    // it is "request.query.data", just like before
    // we will use this query when pinging the API and when checking the DB
    query: request.query.data,

    // Property #2. This is the logic to use when the data already exists in the database
    cacheHit: (results) => {
      console.log('Got data from SQL');
      // Send the results that the DB returned to us
      response.send(results.rows[0]);
    },

    // Property #3. This is the logic to use when the data does not exist
    // i.e., ping the API for data and save it
    // let's abstract that logic into a helper function called Location.fetchLocation
    // and send the request.query.data as the argument for that method to use as the query
    // when it pings the API for the latitude and longitude
    cacheMiss: () => {
      // helper function, returns the location object, which we send to the client
      Location.fetchLocation(request.query.data)
        .then(data => response.send(data));
    },
  };

  // let's call the function to check for the location in the database
  // this is the entry point to our decision tree
  // it will determine if the location is already in the database
  // if so, it will use the cacheHit method defined above
  // if not, it will use the cacheMiss method defined above
  // let's send those two methods, plus the query, all together as the argument
  // we can then use dot notation within Location.lookupLocation to access the three properties
  Location.lookupLocation(locationHandler);

}

// Constructor 
function Location(query, data) {
  this.search_query = query;
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}

// Instance Method: Save a location to the DB
Location.prototype.save = function() {
  // protect yourself: don't allow a user to type raw SQL into an input field and nuke your DB!
  // the $1, $2, $3, $4 maps directly over to the array of values
  // yes, I know, the $ numbering starts at 1 and arrays start at 0
  // The important part is that they map over in the same order
  let SQL = `INSERT INTO locations (search_query,formatted_query,latitude,longitude) 
      VALUES($1,$2,$3,$4) RETURNING id`;
  
  // array of values will be used by postgres
  let values = [this.search_query, this.formatted_query, this.latitude, this.longitude];
  // alternate way to obtain an array of the values of an instance
  // let values = Object.values(this);
  
  // will return the id to us because we asked for it in the SQL query above
  return client.query(SQL,values);
};

// Static Method: Fetch a location from geocode API
// call this method if the location does not exist in the DB
Location.fetchLocation = (query) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.GEOCODE_API_KEY}`;
  return superagent.get(url)
    .then( apiResults => {
      console.log('Got results from API');
      // make sure the API gives us data
      // if not, throw an error to force the app to crash
      // console.error lets the app hang
      if ( ! apiResults.body.results.length ) { throw 'No results'; }
      else {
        // Create an instance and save it to the DB
        let location = new Location(query, apiResults);

        // call the save method on the new instance
        // this will add the location to the DB, since it doesn't exist yet
        // postgres uses Promises, which is why we can chain .then
        return location.save()
          .then( result => {
            // add the id that postgres returned to us as the id on the location
            // we'll use it later as the foreign key for the other tables
            // that way, the weather for Cleveland will be associated with the other data for Cleveland
            location.id = result.rows[0].id
            return location;
          })
      }
    });
};

// Static Method: Lookup a location in the DB and invoke the proper callback methods based on what you find
// our getLocation method will invoke Location.lookupLocation with the object literal we created
// that object is referred to here as "handler", but that's just a parameter name
// we know that it's an object literal with three properties: query, cacheHit, and cacheMiss
// therefore, we can determine if location exists in the DB
// If so, invoke the cacheHit method. If not, incoke the cacheMiss method.
Location.lookupLocation = (handler) => {

  const SQL = `SELECT * FROM locations WHERE search_query=$1`;
  // remember, we assigned the value of "query" in the object literal to be "request.query.data"
  // so, we are checking the database for a location that is the same as whatever the user enters
  const values = [handler.query];

  return client.query( SQL, values )
  // "results" is a parameter representing the big object of data from Postgres 
    .then( results => {
      // Postgres will always include a "rowCount" property which is an integer
      // if the rowCount is greater than 0, this location exists in the DB
      // no need to request info from the API, let's use our cacheHit method
      if( results.rowCount > 0 ) {
        handler.cacheHit(results);
      }
      // this will execute if the rowCount is 0, meaning the location is not in the DB
      // let's execute the cacheMiss method to request the data from the API and save it
      else {
        handler.cacheMiss();
      }
    })
    // the line below is doing the same thing as:
    // .catch(err => console.error(err))
    // this works because the error is passed into the .catch by default
    // so we can simply write "console.error" and it will pass the error in as the arg
    // this works with other functions too! It's not an error handling thing, it's a JavaScript thing
    .catch( console.error );

};

// ---------- WEATHER ------------- //

// Route Handler

// follow the pattern from locations, above.... 
function getWeather(request, response) {

  const handler = {

    location: request.query.data,

    // weather data is in DB
    cacheHit: function(result) {
      response.send(result.rows);
    },

    // weather data is not in DB
    cacheMiss: function() {
      // this method is defined below to fetch weather data from the API and then save it
      Weather.fetch(request.query.data)
        .then( results => response.send(results) )
        .catch( console.error );
    },
  };

  Weather.lookup(handler);

}

// Weather Constructor
function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toString().slice(0, 15);
}

// Instance Method: Save a location to the DB
Weather.prototype.save = function(id) {
  const SQL = `INSERT INTO weathers (forecast, time, location_id) VALUES ($1, $2, $3);`;
  const values = Object.values(this);
  values.push(id);

  // the following lines can also be used as the "values"
  // keep in mind that the "id" is the parameter defined above
  // therefore, whatever is passed in as an argument to the save method will be referred to as "id" and used as the third value for the SQL query by Postgres
  // when we invoke the save method, the argument used below is the "location.id"
  // remember, we added it as a property earlier, this is the reason why!
  // now, each row/record in the weathers table will have a value for the location_id field/column
  // recall from our schema that the location_id is the foreign key
  // therefore, if Seattle has a primary key of 1, all eight records from the weather API will have the same foreign key of 1 so they can all be associated with Seattle
  // however, each location will also have its own primary key, as every table schema should
  // const values = [this.forecast, this.time, id];

  client.query(SQL, values);
};

// Static Method: Lookup a location in the DB and invoke the proper callback methods based on what you find
// this follows a similar pattern as the Location.lookupLocation method... 
// Question -- Is there an opportunity to DRY this out?
Weather.lookup = function(handler) {
  const SQL = `SELECT * FROM weathers WHERE location_id=$1;`;
  client.query(SQL, [handler.location.id])
    .then(result => {
      if(result.rowCount > 0) {
        console.log('Got data from SQL');
        handler.cacheHit(result);
      } else {
        console.log('Got data from API');
        handler.cacheMiss();
      }
    })
    .catch(error => handleError(error));
};

// Static Method: Fetch a location from the weather API
// this is invoked as part of the Weather.cacheMiss method
Weather.fetch = function(location) {
  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${location.latitude},${location.longitude}`;

  return superagent.get(url)
    .then(result => {
      const weatherSummaries = result.body.daily.data.map(day => {
        const summary = new Weather(day);
        summary.save(location.id);
        return summary;
      });
      return weatherSummaries;
    });
};
