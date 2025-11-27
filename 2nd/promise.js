// 비동기처리.
// 변수 => +2 => *3 => -5 => result.

function backupFnc() {
  // promise객체의 상태 => fulfilled, rejected, pending
  const promise = new Promise((resolve, reject) => {
    console.log("welcome");
    if (Math.ceil(Math.random() * 10) % 2 == 0) {
      resolve("ok");
    } else {
      reject("fail");
    }
  });

  promise //
    .then((result) => {
      console.log(`result => ${result}`);
    })
    .catch((err) => {
      console.log(`err => ${err}`);
    });
} // 호출안하기.

// async/ await 방식.
async function promiseCall() {
  let x = 10;
  try {
    x = await new Promise((resolve, reject) => {
      setTimeout(() => {
        x += 2;
        resolve(x);
      }, 1500);
    });
    x = await new Promise((resolve, reject) => {
      setTimeout(() => {
        x *= 3;
        resolve(x);
      }, 1000);
    });
    x = await new Promise((resolve, reject) => {
      setTimeout(() => {
        x -= 5;
        resolve(x);
      }, 500);
    });
    console.log(`결과 => ${x}`);
  } catch (err) {
    console.log(err);
  }
}
// promiseCall();

module.exports = { promiseCall, backupFnc };
