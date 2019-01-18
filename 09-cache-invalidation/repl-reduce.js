const nums = [5, 7, 12, 91, 44, 22, 50];

// nums.reduce((accumulator, current) => {
//   console.log('accumulator is:', accumulator);
//   console.log('current is:', current);

//   return accumulator + current;
// });



const characters = [
  {
    name: 'Eddard',
    spouse: 'Catelyn',
    children: ['Robb', 'Sansa', 'Arya', 'Bran', 'Rickon'],
    house: 'Stark'
  },
  {
    name: 'Jon A.',
    spouse: 'Lysa',
    children: ['Robin'],
    house: 'Arryn'
  },
  {
    name: 'Cersei',
    spouse: 'Robert',
    children: ['Joffrey', 'Myrcella', 'Tommen'],
    house: 'Lannister'
  },
  {
    name: 'Daenarys',
    spouse: 'Khal Drogo',
    children: ['Drogon', 'Rhaegal', 'Viserion'],
    house: 'Targaryen'
  },
  {
    name: 'Mace',
    spouse: 'Alerie',
    children: ['Margaery', 'Loras'],
    house: 'Tyrell'
  },
  {
    name: 'Sansa',
    spouse: 'Tyrion',
    children: [],
    house: 'Stark'
  },
  {
    name: 'Jon S.',
    spouse: null,
    children: [],
    house: 'Snow'
  }
]

const instructor = {};
instructor.name = 'Allie';
instructor['name'] = 'Allie';

characters.reduce((acc, curr) => {
  console.log('accumulator is:', acc);
  console.log('current is:', curr);

  acc[curr.name] = curr.house;
  return acc;
}, {});
