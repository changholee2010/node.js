// todo.js
const fs = require("fs");

console.log("start");

fs.readFile("./data.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  let students; // 남학생들만 모아서 출력하기.
  students = data.split("\r\n").reduce((acc, elem) => {
    let [id, name, gender, score] = elem.split(","); // array destructuring.
    if (gender == "남") {
      acc.push({ id, name, gender, score });
    }
    return acc;
  }, []);
  // [{id: 1, name:'홍길동', gender:'남', score: 60},
  //  {id: 3, name:'이준호', gender:'남', score: 74}]
  console.log(students);
});

console.log("end");
