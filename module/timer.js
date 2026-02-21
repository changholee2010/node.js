// timer.js
setTimeout(function () {
  console.log("1초후에 실행");
}, 1000);

const job = setInterval(function () {
  console.log("현재시간에 실행");
}, 1000);

// 종료.
setTimeout(() => {
  clearInterval(job);
}, 10000);
