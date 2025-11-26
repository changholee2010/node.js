// literal.js
const { students } = require("./data");

let id = "user01";
let email = "user01@email.com";

console.log(`id는 ${id}, 이메일은 ${email}`);

console.log(`${3 % 2 == 0 ? "짝수" : "홀수"}`);

console.log(
  `${
    students
      .map((elem) => elem.name)
      .sort()
      .join("씨 ") + "씨"
  }`
);
