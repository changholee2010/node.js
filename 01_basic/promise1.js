// async, await

async function main() {
  let data = 10;
  try {
    const p1 = await new Promise(function (resolve) {
      setTimeout(() => {
        console.log("1번째");
        data += 5;
        console.log(`data=> ${data}`);
        resolve(data); // then 메소드 호출.
      }, 2000);
    });
    console.log(`p1=> ${p1}`);

    const p2 = await new Promise(function (resolve) {
      setTimeout(() => {
        console.log("2번째");
        data *= 2;
        console.log(`data=> ${data}`);
        resolve(data); // then 메소드 호출.
      }, 3000);
    });

    await new Promise(function (resolve, reject) {
      setTimeout(() => {
        console.log("3번째");
        data -= 7;
        try {
          console.log(`data=> ${data}`);
          resolve(data); // 정상처리.
        } catch (err) {
          reject(err); // 비정상종료.
        }
      }, 1000);
    });
  } catch (err) {
    console.error(err);
  }
  // 코드의 진행.
  //.....
  console.log("end of prog.");
} // end of main.
main();
