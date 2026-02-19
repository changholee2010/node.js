//

// 비동기방식코드 -> 동기방식코드.
async function run() {
  let data = 10;

  await new Promise(function (resolve) {
    setTimeout(() => {
      console.log("1번째");
      data += 5;
      console.log(`data=> ${data}`);
      resolve(data); // then 메소드 호출.
    }, 2000);
  });

  await new Promise(function (resolve) {
    setTimeout(() => {
      console.log("2번째");
      data *= 2;
      console.log(`data=> ${data}`);
      resolve(data); // then 메소드 호출.
    }, 3000);
  });

  await new Promise(function (resolve) {
    setTimeout(() => {
      console.log("3번째");
      data -= 7;
      console.log(`data=> ${data}`);
    }, 1000);
  });
}
run();
