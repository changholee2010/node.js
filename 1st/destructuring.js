// destructuring.js
const obj = {
  firstName: "John",
  lastName: "Doe",
  age: 37,
  email: "john@email.com",
};

const { firstName, lastName, age, email } = obj;
console.log(
  `firstName: ${firstName}, lastName: ${lastName}, age: ${age}, email: ${email}`
);

const scores = [20, 50, 30, 40, 70];
const [a, b, ...c] = scores;
console.log(a, b, c);

// 매개값의 초기값.
function say(message = "파라미터가 전달X") {
  console.log(message);
}

say("hello");

function sum(...args) {
  console.log(args); // arguments: 함수의 매개변수를 처리하는 객체.
  let result = 0;
  // 1) arguments 객체 활용.
  // for (let prop in arguments) {
  //   result += arguments[prop];
  // }

  // 2) rest parameter 활용.
  for (let i = 0; i < args.length; i++) {
    result += args[i];
  }
  return result;
}
console.log(sum(1, 2, 3, 4));
