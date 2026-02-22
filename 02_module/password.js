// password.js
const crypto = require("crypto");

const pw = crypto.createHash("sha512").update("test1234").digest("base64");
// console.log(pw);

async function createPassword() {
  // salt 생성(달라지는 시드값)
  const salt = await new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        console.log("error=>", err);
        reject(err);
      }
      // console.log(buf.toString("base64"));
      resolve(buf.toString("base64")); // salt변수에 저장.
    });
  });
  // console.log(`salt=> ${salt}`);

  // 암호화된 비밀번호.
  // 1)암호화 평문// 2) salt 값.// 3) 10만번 반복 해시.// 4) 길이// 5) 해시함수
  // 6) callback 함수.
  crypto.pbkdf2("test1234", salt, 100000, 64, "sha512", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data.toString("base64"));
  });
} // end of createPassword.
createPassword();
