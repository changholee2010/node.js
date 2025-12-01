// mysql db 를 활용.
const mysql = require("mysql2/promise");
const crypto = require("crypto");

const pool = mysql.createPool({
  host: "192.168.0.19",
  user: "dev01",
  password: "dev01",
  database: "dev",
  connectionLimit: 10,
});

// 암호화 함수.
function createEncPassword(pw, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(pw, salt, 100000, 64, "sha512", (err2, key) => {
      if (err2) {
        reject(`salt활용해서 암호화중 에러 => ${err2}`);
        return;
      }
      const cryptoPass = key.toString("base64");
      resolve({ salt: salt, password: cryptoPass });
    }); // end of pbkdf2.
  });
}

// 모듈. export 활용.
module.exports = { pool, createEncPassword };
