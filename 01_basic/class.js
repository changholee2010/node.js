// class.js
// 객체(Object) - 학생(개념) - 학생(실체)
//               클래스(정의) - 인스턴스(실체)
class Student {
  // 값을 저장(속성) --> 학생번호, 이름, 키, 몸무게, 점수....
  constructor(studNo, studName, height) {
    this.studNo = studNo;
    this.studName = studName;
    this.height = height;
  }

  // 동작을 저장(메소드)
  showInfo() {
    return `학번은 ${this.studNo}이고, 이름은 ${this.studName}`;
  }
}

// 인스턴스 생성.
const s1 = new Student("S001", "홍길동", 176.9);
console.log(s1.showInfo());
const s2 = new Student("S002", "박민수", 180.9);

// 인스턴스(객체=object).
const obj = {
  name: "Hong",
  age: 20,
  friends: ["Kim", "Park", "Choi"],
  pets: [
    { name: "멍멍이", age: 3, friends: ["누렁이", "멍이"] },
    { name: "야옹이", age: 2 },
  ],
  showInfo: function () {
    return `이름은 ${this.name}`;
  },
};
console.log(obj["pets"][0]["friends"][0]);
console.log(window);

const obj1 = {
  name: "Hwang",
  age: 21,
  showInfo: function () {
    return `이름은 ${this.name}`;
  },
};

// class Student
function Member(memberNo, memberName) {
  this.memberNo = memberNo;
  this.memberName = memberName;
  this.showInfo = function () {
    return `번호는 ${this.memberNo}, 이름은 ${this.memberName}`;
  };
}
const m1 = new Member("M001", "User01"); // 인스턴스.
console.log(window.showInfo());
