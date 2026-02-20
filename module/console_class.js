// console_class.js
const { Console } = require("console");
const { boardList } = require("./board");
const fs = require("fs"); // 내장모듈.

// console.log(console); // log 형식출력.
// console.table(boardList()); // 표형식출력.
const output = fs.createWriteStream("./output/stdout.log", { flags: "a" });
const errorLog = fs.createWriteStream("./output/stderr.log", { flags: "a" });

const logger = new Console({ stdout: output, stderr: errorLog });
// logger.log("현재 시간은 " + new Date());
// logger.error("에러가 발생");

module.exports = { logger };
