// console 모듈.
const { Console } = require("console");
const fs = require("fs");

const output = fs.createWriteStream("./stdout.txt", { flags: "a" }); // 쓰기용도의 파일생성.
const errOutput = fs.createWriteStream("./stderr.txt", { flags: "a" });

const logger = new Console({ stdout: output, stderr: errOutput });
logger.log("log출력");
logger.error("error출력");

console.log("hello");
console.error("에러발생");
const arr = [
  { name: "John Doe", email: "John@email.com" },
  { name: "Jeremy Go", email: "jeremy@email.com" },
];
console.table(arr);
