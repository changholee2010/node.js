// 객체를 생성.
const stud1 = {
  stdNo: 1001,
  stdName: "박예인",
  score: 100,
  setScore: function (score) {
    this.score = score;
  },
  getScore: function () {
    return this.score;
  },
};

// 객체를 생성하기 위한 규칙(틀)
class Student {
  // 생성자.
  constructor(stdNo, stdName, score) {
    this.stdNo = stdNo;
    this.stdName = stdName;
    this.score = score;
  }
  setScore(score) {
    this.score = score;
  }
  getScore() {
    return this.score;
  }
}

const stud2 = new Student(1002, "김수연", 90); // instance 생성.
const stud3 = new Student(1003, "함수고", 80); // instance 생성.

console.log(stud1.stdNo, stud1.getScore());
console.log(stud2.stdNo, stud2.getScore());
