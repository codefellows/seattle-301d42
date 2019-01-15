const allie = {
  firstName: 'Allie',
  lastName: 'Grampa',
  role: 'Instructor'
}

// Object.keys => returns an array of the object's keys
// console.log('Object.keys:', Object.keys(allie));

// Object.values => returns an array of the object's values
// console.log('Object.values:', Object.values(allie));

// Object.entries => returns an array of the object's key-value pairs
// console.log('Object.entries:', Object.entries(allie)[2][1]);









const instructionalTeam = [
{
  firstName: 'Allie',
  lastName: 'Grampa',
  role: 'Instructor'
},
{
  firstName: 'David',
  lastName: 'Chambers',
  role: 'Teaching Assistant'
}
];

// Object.keys => returns an array of the object's keys
// console.log('Object.keys:', Object.keys(instructionalTeam[1]));

// Object.values => returns an array of the object's values
// console.log('Object.values:', Object.values(instructionalTeam));

// Object.entries => returns an array of the object's key-value pairs
// console.log('Object.entries:', Object.entries(instructionalTeam));

instructionalTeam.forEach(person => console.log(person.firstName))

