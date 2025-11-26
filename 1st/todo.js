// todo.js
const fs = require("fs");

console.log("start");

fs.readFile("./data.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.split("\r\n"));
  let students; // 남학생들만 모아서 출력하기.
  // [{id: 1, name:'홍길동', gender:'남', score: 60},
  //  {id: 3, name:'이준호', gender:'남', score: 74}]
});

console.log("end");
