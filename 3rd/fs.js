// fs.js
const fs = require("fs");

console.log("start");

// data.txt 읽기.
// women.txt 여학생정보만 저장.
fs.readFile("./data.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(`err=> ${err}`);
    return;
  }
  // 읽기.
  let txt = data
    .split("\r\n")
    .filter((elem) => {
      // 2,김서연,여,70
      let [id, name, gender, score] = elem.split(",");
      if (gender == "여") {
        return true;
      }
    })
    .join("\r\n");

  // 쓰기.
  fs.writeFile("./women.txt", txt, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("done");
  });
});

console.log("end");

function fileWriteFnc() {
  // 비동기처리.
  // fs.writeFile("./write.txt", "Hello, World", "utf-8", (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log("done");
  // });
  let data = "Nice to meet you.";
  // 동기처리.
  fs.writeFileSync("./write.txt", data);
  console.log("done");
}

function fileReadFnc() {
  // 동기처리.
  const data = fs.readFileSync("./data.txt", "utf-8");
  console.log(data);

  // 비동기처리.
  // fs.readFile("./data.txt", "utf-8", (err, data) => {
  //   if (err) {
  //     console.log(`err=> ${err}`);
  //     return;
  //   }
  //   console.log(data);
  // });
}
