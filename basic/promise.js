// promise.js
// promise 객체: pending/ fulfilled/ rejected
// fetch("./MOCK_DATA.json")
//   .then((resp) => resp.json())
//   .then((result) => {
//     console.log("result=> ", result);
//     console.log("end of prog.");
//   });

// setTimeout();
// 1번째 => 2초 작업.
// 2번째 => 3초 작업.
// 3번째 => 1초 작업. => 6초 작업.
// 비동기방식 처리가 시간상의 이점.
// Promise => 비동기처리를 동기방식의 코드.
// 예제.
const promise = new Promise(function (resolve, reject) {
  console.log("promise call.");
  resolve("OK");
});

promise //
  .then((param) => {
    console.log(param);
    return 1; // promise 처리.
  })
  .then((param) => {
    console.log(param);
  })
  .catch((param) => {
    console.error(param);
  });

//
// 비동기방식코드 -> 동기방식코드.
let data = 10;

const p1 = new Promise(function (resolve) {
  setTimeout(() => {
    console.log("1번째");
    data += 5;
    console.log(`data=> ${data}`);
    resolve(data); // then 메소드 호출.
  }, 2000);
});
p1.then((data) => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log("2번째");
      data *= 2;
      console.log(`data=> ${data}`);
      resolve(data); // then 메소드 호출.
    }, 3000);
  });
})
  .then((data) => {
    return new Promise(function (resolve) {
      setTimeout(() => {
        console.log("3번째");
        data -= 7;
        console.log(`data=> ${data}`);
      }, 1000);
    });
  })
  .catch((err) => {
    console.log(err);
  });

let answer = 10;
// 1번째작업 => 5를 더하고 : 15
// 2번째작업 => 2를 곱하고 : 30
// 3번째작업 => 7을 빼기.  : 27 최종.
// setTimeout(() => {
//   console.log("1번째");
//   answer += 5;
//   console.log(`answer=> ${answer}`);

//   setTimeout(() => {
//     console.log("2번째");
//     answer *= 2;
//     console.log(`answer=> ${answer}`);

//     setTimeout(() => {
//       console.log("3번째");
//       answer -= 7;
//       console.log(`answer=> ${answer}`);
//     }, 1100);
//   }, 800);
// }, 1000);
