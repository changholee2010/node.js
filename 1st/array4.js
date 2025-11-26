// array4.js
const { students } = require("./data.js");
// reduce활용. gender => '여' => studArray 배열에 추가.
let studArray = students.reduce((acc, elem) => {
  console.log(acc[elem["class"]], elem["class"]);

  // 반속성이 있는지 여부를 체크해서 선언하기.
  if (acc[elem["class"]] == undefined) {
    acc[elem["class"]] = []; // {'1-A': ['홍길동','김길동'], '1-B':[]}
  }
  acc[elem["class"]].push(elem.name);

  return acc;
}, {});
// { male: [], female: [] } => 남,여 학생.
// {} => 반별로 학생 추가.

console.log(studArray);
