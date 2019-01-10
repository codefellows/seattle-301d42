const names = ['Tim', 'Chris M.', 'Jasmin', 'Jessica', 'chris B.', 'Paul', 'Milo', 'Spencer', 'Dan'];

const sortedNames = names.sort();

// console.log('sorted', sortedNames);
// console.log('original', names);


const numbers = [1, 21, 31, 49, 42, 5, 11, 9, 99];

const sortedNumbers = numbers.sort((a, b) => a - b);
// console.log(sortedNumbers);



const courses = [
  {title: 'Code 201', enrollment: 24},
  {title: 'Code 301', enrollment: 9},
  {title: 'Code 401, Javascript', enrollment: 12},
  {title: 'Code 401, Java', enrollment: 20},
  {title: 'Code 401, C#', enrollment: 18},
  {title: 'Code 401, Python', enrollment: 11}
];

courses.sort((a, b) => {
  return b.enrollment - a.enrollment;
});

console.log(courses);
