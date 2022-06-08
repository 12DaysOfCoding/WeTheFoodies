// Code standard for javascript files
// Find more: https://github.com/airbnb/javascript

// Reference
const aConst = 1; // use const for references which cannot be reassigned
let b = 3; // use let for references which can be reassigned
var c = 1; // use var for references which can be accessed outside some block
const item = {}; // create an empty object

// Object
const object = {
  aConst, // shorthand, equivalent to "aConst: aConst,"
  value: 1, // basic assignment
  [getKey('enabled')]: true, // refer to function for key
  addValue(value) { // function 
    return object.value + value;
  },
};
function getKey(k) {
  return `a key named ${k}`;
}

const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // Object copy => { a: 1, b: 2, c: 3 }
const { a, ...noA } = copy; // Object noA => { b: 2, c: 3 }

// Array
const items = []; // create an array
items.push('a'); // add an element in the array
const itemsCopy = [...items]; // deep copy an array

const foo = document.querySelectorAll('.foo'); // get all elements in the document with class="foo"
const nodes = [...foo]; // convert an iterable object to an array

const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };
const arr = Array.from(arrLike); // ['foo', 'bar', 'baz'] // convert an array-like object to an array

const foo1 = [1, 2, 3];
function bar(x){
  return x + x;
}
const baz = Array.from(foo1, bar); // map over iterables => [2, 4, 6]

// How to use line breaks
const arr1 = [[0, 1], [2, 3], [4, 5]];
const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

// Destructuring
function getFullNameNameNameNameNameNameName(user) {
  const { firstName, lastName } = user; // const firstName = user.firstName; const lastName = user.lastName;
  return `${firstName} ${lastName}`; // build up strings
}

const arr2 = [1, 2, 3, 4];
const [first, second] = arr2; // const first = arr2[0]; const second = arr2[1];

// Functions
// Use default parameter syntax rather than mutating function arguments
function handleThings(opts = {}) {
  console.log(opts);
}

// use functions with super long function name
const foo2 = (
  getFullNameNameNameNameNameNameName(user1)
);

// Never reassign parameters
function f3(a) {
  const result = a || 1;
  return result;
}

const x = [1, 2, 3, 4, 5];
console.log(...x); // 1 2 3 4 5

// Arrow Functions
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// Iterators
const numbers = [1, 2, 3, 4, 5];
let sum = 0;
numbers.forEach((num) => {
  sum += num;
}); // sum = 15

// Comparison
switch (b) {
case 1: {
  let x = 1;
  console.log(x);
  break;
}
case 2: {
  const y = 2;
  console.log(y);
  break;
}
default: {
  console.log(b);
  break;
}
}

// for passing the lint test, no need to view
console.log(b);
console.log(c);
console.log(item);
console.log(a);
console.log(noA);
console.log(itemsCopy);
console.log(nodes);
console.log(arr);
console.log(arr1);
console.log(objectInArray);
const user1 = {
  firstName: 'first',
  lastName: 'last',
};
console.log(first);
console.log(second);
const foo3 = handleThings(user1);
console.log(foo3);
console.log(f3(1));
console.log(sum);
console.log(x);
console.log(baz);
console.log(foo2);
