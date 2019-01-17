const fruits = ['apple', 'strawberry', 'kiwi', 'mango', 'pomegranate', 'watermelon', 'pineapple', 'lime'];

const output = new Array();

for(let i = 0; i < fruits.length; i++) {
  if(fruits[i].length > 5) {
    output.push(fruits[i]);
  }
}

console.log(output);

fruits.filter(fruit => fruit.length > 5);
