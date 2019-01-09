'use strict';

function Dog(dogObject) {

}

Dog.allDogs = [];

Dog.prototype.render = function() {
  // making a copy of the template
  // make a new section
 

  // get the html of the template

  // set the section's html === template html

  // fill in the properties from each instance

};

Dog.readJson = () => {

};

Dog.loadDogs = () => {
  Dog.allDogs.forEach(dog => dog.render());
};

$(() => Dog.readJson());
