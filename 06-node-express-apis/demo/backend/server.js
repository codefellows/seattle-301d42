'use strict';

// application dependencies
const express = require('express');
const cors = require('cors');

// configure environment variables
// in other words, use the .env file
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data);
  response.send(locationData);
});



// test route
// format of a route: app.METHOD(PATH, CALLBACK)
app.get('/testing', (request, response) => {
  console.log('Hit the /testing route!');

  let david = {firstName: 'David', lastName: 'Chambers', awesome: true};
  response.json(david);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


// HELPER FUNCTIONS
function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = new Location(geoData);
  location.search_query = query;
  console.log(location);
  return location;
}

function Location(data) {
  this.formatted_query = data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;
}
