'use strict';

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// middleware from Express
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

// app.get('/david-is-awesome')

app.post('/contact', (request, response) => {
  console.log(request.body);

  response.sendFile('./thanks.html', {root: './public'});
});

app.get('*', (request, response) => {
  response.status(404).send('This route is not found');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
