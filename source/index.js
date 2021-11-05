/**
 * Entry point
 */

// currently this contains some simple test code to verify the linter
let test = () => {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    let greeting = 'hello ';
    greeting += parseInt(i);
    arr.push(greeting);
  }

  arr.forEach(elem => console.log(elem));
};

test();
