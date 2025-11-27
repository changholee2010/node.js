// module.js
const { promiseCall } = require("./promise.js");
const fs = require("fs");

const data = fs.readFileSync("./class.js", "utf-8");
console.log(data);

console.log("end of prog.");
