'use strict';

let neighborhoods = [];

// REVIEW: This is another way to use a constructor to duplicate an array of raw data objects
function Neighborhood (rawDataObject) {
  for (let key in rawDataObject) {
    this[key] = rawDataObject[key];
    // this.name = rawDataObject.name;
  }
  // this['name'] = rawDataObject['name'];
  // this['city'] = rawDataObject['city'];
  // this['founded'] = rawDataObject['founded'];
  // this['population'] = rawDataObject['population'];
  // this['body'] = rawDataObject['body'];
}

Neighborhood.prototype.toHtml = function() {
  // 1. Get the HTML template
  let $htmlTemplate = $('#neighborhood-template').html();

  // 2. Compile the source with Handlebars
  let templateRender = Handlebars.compile($htmlTemplate);

  console.log(templateRender);

  // 3. Return the HTML from the compile method
  return templateRender(this);
};

neighborhoodDataSet.forEach(neighborhoodObject => {  // eslint-disable-line
  neighborhoods.push(new Neighborhood(neighborhoodObject));
});

neighborhoods.forEach(ourNewNeighborhoodObject => {
  $('#neighborhoods').append(ourNewNeighborhoodObject.toHtml());
});
