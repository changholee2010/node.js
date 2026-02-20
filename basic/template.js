// "Hello", 'World', `Hongkildong`
// 연산식을 사용.
const obj = {
  name: "Hongkildong",
  age: 20,
  showInfo: function () {
    // 메소드.
    return `이름: ${this.name}, 나이: ${this.age}`;
  },
};

console.log("이름은 " + obj["name"] + "이고, 나이는 " + obj["age"]);
console.log(
  `이름은 ${obj["name"]}이고, 나이는 ${obj["age"]}이고 ${obj.age >= 20 ? "성인" : "미성년"}입니다.`,
);
console.log(`obj의 정보 : ${obj.showInfo()}`);

console.log(
  `남자들의 이름은 ${ary
    .filter((elem) => elem.gender == "Male")
    .map((elem) => elem.first_name)
    .join(",")}`,
);

// spread operator (펼침 연산자)
const ary1 = [1, 2, 3];
const ary2 = [4, 5, 6];

const ary3 = [...ary1, ...ary2];
console.log(ary3);

// 객체 구조분해(destructuring)
const obj1 = { first_name: "Kildong", last_name: "Hong", age: 20 };
const { first_name, last_name, age } = obj1;

// 배열 구조분해(destructuring)
const [a1, ...a2] = ary1; // [1, 2, 3];
console.log(a1, a2);

const [m1, m2, m3] = getMember();
// const [meda, rows] = conn.execute('select * from boarc')
console.log(m1, m2, m3);

// default parameter function. (매개변수의 초기값)
function sum(n1 = 0, n2 = 0, ...args) {
  // if (n1 == undefined) return 0;
  // if (n2 == undefined) return n1;
  let result = n1 + n2;
  for (let i = 0; i < args.length; i++) {
    result += args[i];
  }
  return result;
}
result = sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
console.log(result); // NaN
