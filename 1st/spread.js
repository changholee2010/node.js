// spread operator.
const arr1 = [4, 5, 6];
const arr2 = [1, 2, 3];

const arr3 = [...arr1, ...arr2];
// console.log(arr3);

// 중첩 for.
const forAry = [
  // [1, 2, 3, 4, 5],
  // [6, 7, 8, 9, 10],
  // [11, 12, 13, 14, 15],
  // [16, 17, 18, 19, 20],
  // [21, 22, 23, 24, 25],
];

let num = 1;
for (let i = 0; i < 5; i++) {
  forAry[i] = []; // 배열[i]의 위치에 다시 배열 선언.
  for (let j = 0; j < 5; j++) {
    forAry[i][j] = num++;
  }
}
console.log("첫번째 결과.");
for (let i = 0; i < 5; i++) {
  console.log(`${forAry[i].map((elem) => (" " + elem).slice(-2)).join(" ")}`);
}

// 2번째.
num = 25;
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    forAry[i][j] = num--;
  }
}
console.log("\n두번째 결과.");
for (let i = 0; i < 5; i++) {
  console.log(`${forAry[i].map((elem) => (" " + elem).slice(-2)).join(" ")}`);
}

// 3번째.
num = 1;
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    forAry[j][i] = num++;
  }
}
console.log("\n세번째 결과.");
for (let i = 0; i < 5; i++) {
  console.log(`${forAry[i].map((elem) => (" " + elem).slice(-2)).join(" ")}`);
}
