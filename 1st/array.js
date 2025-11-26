// array.js
// sort() 함수.

let fruits = ["apple", "Mango", "Banana", "Orange"];
fruits.sort();

console.log(fruits);

let numbers = [23, 17, 1, 10, 54, 100];
numbers.sort(function (a, b) {
  console.log(a, b);
  if (a < b) {
    return -1; // 음수값을 반환.
  } else {
    return 1;
  }
});
console.log(numbers);

console.log("홍씨" < "박씨");

let members = [
  { name: "홍씨", point: 100 },
  { name: "박씨", point: 150 },
  { name: "김씨", point: 200 },
];
members.sort((a, b) => {
  //정렬조건.
  return a.name < b.name ? -1 : 1;
});
console.log(members);

fetch("http://localhost:3000/posts")
  .then((resp) => resp.json())
  .then((result) => {
    result.sort((a, b) => {
      return a.author < b.author ? -1 : 1;
    });
    console.log(result);
  });
