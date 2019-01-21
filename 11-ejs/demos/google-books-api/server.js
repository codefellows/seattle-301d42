'use strict';

// Application Dependencies
const express = require('express');
const superagent = require('superagent');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Application Middleware



// Set the view engine for server-side templating



// API Routes
// Renders the search form
app.get('/', newSearch);

// Creates a new search to the Google Books API
app.post('/searches', createSearch);

// Catch-all
app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// HELPER FUNCTIONS

// Book constructor
function Book(info) {
  
}

// Render index page on page load
function newSearch(request, response) {

}

// No API key required
// Console.log request.body and request.body.search
function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);
  console.log(request.body.search);

  // if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  // if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

}
