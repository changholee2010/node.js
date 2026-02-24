// crypto.js
const crypto = require("crypto");
require("dotenv").config();

// 평문을 암호화하는 함수.
function createPassword(plainTxt) {
  const salt = process.env.MYSQL_SALT;
  const passwd = crypto.pbkdf2Sync(plainTxt, salt, 100000, 64, "sha512");
  console.log(passwd.toString("base64"));
  return passwd.toString("base64"); // 암호화.
}

// 입력한 비밀번호 vs. 데이터베이스에 저장된 값과 비교.
function checkPassword(plainTxt, hashPasswd) {
  const hashPasswd1 = createPassword(plainTxt);
  return hashPasswd1 == hashPasswd;
}

// const dbPass = `kmkihnXC/JtXMKmEuGle5K1YWYDCMeJIr9h5MaV1sfgUzJzxZPSbqX1KD7LLfZeg+ZbCpSmz5enuNBz3YQjvaw==`;
// console.log(dbPass.length);
// console.log(checkPassword("test1233", dbPass));

module.exports = { createPassword, checkPassword };
