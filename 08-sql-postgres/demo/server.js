'use strict';

// application dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// configure environment variables
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/location', searchToLatLong);
app.get('/weather', getWeather);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


// ERROR HANDLING
function handleError(error, response) {
  console.error(error);
  if(response) response.status(500).send('Sorry, something went wrong!');
}


// HELPER FUNCTIONS

function searchToLatLong(request, response) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.data}&key=${process.env.GEOCODE_API_KEY}`;

  return superagent.get(url)
    .then(apiResponse => {
      let location = new Location(request.query.data, apiResponse);
      response.send(location);
    })
    .catch(error => handleError(error, response));
}

function getWeather(request, response) {
  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${request.query.data.latitude},${request.query.data.longitude}`;

  return superagent.get(url)
    .then(weatherResponse => {

      const weatherSummaries = weatherResponse.body.daily.data.map(day => {
        return new Weather(day);
      });

      response.send(weatherSummaries);
    })
    .catch(error => handleError(error, response));
}

function Location(query, apiResult) {
  this.search_query = query;
  this.formatted_query = apiResult.body.results[0].formatted_address;
  this.latitude = apiResult.body.results[0].geometry.location.lat;
  this.longitude = apiResult.body.results[0].geometry.location.lng;
}

function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toString().slice(0, 15);
}
