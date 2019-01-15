'use strict';

let __API_URL__;

$('#url-form').on('submit', function(event) {
  event.preventDefault();
  __API_URL__ = $('#back-end-url').val();
  $('#url-form').addClass('hide');
  $('#search-form').removeClass('hide');
});

$('#search-form').on('submit', fetchCityData);

function fetchCityData(event) {
  event.preventDefault();
  let searchQuery = $('#input-search').val();

  $.ajax({
    url: `${__API_URL__}/location`,
    method: 'GET',
    data: {data: searchQuery}
  })
    .then(location => {
      displayMap(location);
      getResource('weather', location);
      getResource('movies', location);
      getResource('yelp', location);
      getResource('meetups', location);
      getResource('trails', location);
    })
    .catch(error => {
      compileTemplate([error], 'error-container', 'error-template');
      $('#map').addClass('hide');
      $('section, div').addClass('hide');
    });
}

function displayMap(location) {
  $('.query-placeholder').text(`Here are the results for ${location.formatted_query}`);

  $('#map').removeClass('hide');
  $('section, div').removeClass('hide');

  $('#map').attr('src', `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude}%2c%20${location.longitude}&zoom=13&size=600x300&maptype=roadmap
  &key=AIzaSyDp0Caae9rkHUHwERAFzs6WN4_MuphTimk`)
}

function getResource(resource, location) {
  $.get(`${__API_URL__}/${resource }`, {data: location})
    .then(result => {
      renderTimeTemplate(result[0], `${resource}-results`)
      compileTemplate(result, `${resource}-results`, `${resource}-results-template`);
    })
    .catch(error => {
      compileTemplate([error], 'error-container', 'error-template');
    })
}

function compileTemplate(input, sectionClass, templateId) {
  $(`.${sectionClass}`).empty();

  let template = Handlebars.compile($(`#${templateId}`).text());

  input.forEach(element => {
    $(`.${sectionClass}`).append(template(element));
  })
}

function renderTimeTemplate(input, sectionClass) {
  $(`.${sectionClass}`).parent().find('p').remove();

  let time = {
    'date-age' : calculateAge(input.created_at)
  }

  let template = Handlebars.compile($('#time-template').text());

  $(`.${sectionClass}`).before(template(time))
}

function calculateAge(created_at){
  let age = Date.now() - created_at;
  if (age > 86400000) {
    return `Updated : ${Math.floor(age / (86400000))} days ago`;
  }
  if (age > 3600000) {
    return `Updated : ${Math.floor(age / (3600000))} hours ago`;
  }
  if (age > 60000) {
    return `Updated : ${Math.floor(age / (60000))} minutes ago`;
  }
  if(age > 1000){
    return `Updated : ${Math.floor(age / (1000))} seconds ago`
  }
  return 'Just updated';
}
