// 암호화.
const crypto = require("crypto");

// let password = crypto
//   .createHash("sha512") // 암호화방식.
//   .update("pw1234") // 암호화할 문장.
//   .digest("base64");
// console.log(password);

async function createCryptoPassword(plainPassword) {
  const salt = await new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        // console.log(err);
        reject(err);
        return;
      }
      // 암호화된듯한 구문.
      const salt = buf.toString("base64");
      // console.log(salt);
      resolve(salt);
    }); // end of randomBytes.
  });

  // 암호화 함수.
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 100000, 64, "sha512", (err2, key) => {
      if (err2) {
        reject(`salt활용해서 암호화중 에러 => ${err2}`);
        return;
      }
      const cryptoPass = key.toString("base64");
      resolve({ salt: salt, password: cryptoPass });
    }); // end of pbkdf2.
  });
} // end of createCryptoPassword.
// 아이디/비밀번호 : 회원가입. salt, 암호화된 비밀번호.
// 아이디/비밀번호 : 로그인.   dkdakdla;

// createCryptoPassword("pw1234") //
//   .then((result) => console.log(result));

// 비밀번호 vs. db 비밀번호 비교.
function checkPassword(loginPassword) {
  const salt =
    "8hIrX6zVT++5GCNMZOn5/s37zTDHRpwdxHf98CblmViIOz2E3FKhzYXUQ5YC+cfm4dUEkpg8YWcRqtNBaxycnA==";
  const dbPassword =
    "Iaq8EbJ89yW6C0Gx9xI9jkMnunim79nZvlzmn/Qz7LuqTea/W7n7O4+FTH5FlrfUb8bz2yrtlA+/nvlGIdeL8Q==";

  // 로그인 시 사용자가 입력한 비밀번호를 암호화한 결과.
  // db에서 조회한 비밀번호를 비교.
  let encPassword = "암호화된비밀번호";

  // crypto.pbkdf2 활용해서 비밀번호 생성.
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(loginPassword, salt, 100000, 64, "sha512", (err2, key) => {
      if (err2) {
        // console.log(`salt활용해서 암호화중 에러 => ${err2}`);
        reject(`salt활용해서 암호화중 에러 => ${err2}`);
        return;
      }
      encPassword = key.toString("base64");
      resolve(dbPassword == encPassword);
    });
  });
}

async function login() {
  let result = await checkPassword("pw1234"); //
  console.log(result);
}
