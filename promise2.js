//

// 비동기방식코드 -> 동기방식코드.
async function run() {
  let data = 10;

  let result1 = await new Promise(function (resolve) {
    setTimeout(() => {
      console.log("1번째");
      data += 5;
      console.log(`data=> ${data}`);
      resolve(data); // then 메소드 호출.
    }, 2000);
  });
  console.log(`result1=> ${result1}`);

  let result2 = await new Promise(function (resolve) {
    setTimeout(() => {
      console.log("2번째");
      data *= 2;
      console.log(`data=> ${data}`);
      resolve(data); // then 메소드 호출.
    }, 3000);
  });
  console.log(`result2=> ${result2}`);

  let result3 = await new Promise(function (resolve) {
    setTimeout(() => {
      console.log("3번째");
      data -= 7;
      console.log(`data=> ${data}`);
      resolve(data);
    }, 1000);
  });
  console.log(`result3=> ${result3}`);
}
run();
