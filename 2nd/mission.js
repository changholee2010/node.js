// 모듈임포트.
const { Console } = require("console");
const fs = require("fs");

// 로그를 기록할 파일을 로그용도/에러용도 구분해서 생성.
const success = fs.createWriteStream("./log/success.txt");
const fail = fs.createWriteStream("./log/fail.txt");
// 로그객체생성.
const logger = new Console({ stdout: success, stderr: fail });

// 실행중 메세지 표시.
// let msg = "running";
// let timerJob = setInterval(() => {
//   msg += ".";
//   console.clear();
//   console.log(msg);
// }, 1000);
// 실행.
let times = 1;
let job = setInterval(() => {
  const currentTime = new Date();
  // 실행시간을 로그로 출력하기 위해서 추가함.
  let runTiming = `${("0" + currentTime.getHours()).slice(-2)}:${(
    "0" + currentTime.getMinutes()
  ).slice(-2)}:${("0" + currentTime.getSeconds()).slice(-2)}`;
  // 실행횟수를 파악해서 종료하기.
  if (times == 10) {
    clearInterval(job);
    // clearInterval(timerJob);
    console.log("end of prog.");
  }
  // 홀수/짝수.
  let oddEven = Math.floor(Math.random() * 2);
  if (oddEven % 2 == 1) {
    logger.log(`[${runTiming} ${times}회] 성공!`);
  } else {
    logger.error(`[${runTiming} ${times}회] 실패!`);
  }
  times++;
}, 1000);

console.time("job");
let sum = 0;
for (let i = 1; i <= 1000000; i++) {
  //
  //console.log(i);
  sum = i;
}
console.timeEnd("job");

const obj = {
  name: "Hong",
  age: 20,
  friends: [
    { name: "Choi" },
    { name: "Park" },
    { name: "Kim", hobbies: ["reading", "eating"] },
  ],
};
console.log(obj);
console.dir(obj, { depth: 1, colors: true });
