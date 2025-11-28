const express = require("express");
const fs = require("fs");
const cors = require("cors");
const crypto = require("crypto");
const { pool, createEncPassword } = require("./db");

const app = express();
const PORT = 3000;

// 셋업.
app.use(cors());
app.use(express.json()); // 요청정보 body : json 처리.

// 라우팅. http://localhost:3000/
// 요청방식 + 리소스 => 처리될정보.
app.get("/", (req, res) => {
  console.log("/ 경로가 호출");
  res.send("/ 호출됨.");
});

app.get("/index", (req, res) => {
  fs.readFile("./data.txt", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    let html = data //
      .split("\r\n")
      .reduce((acc, elem) => {
        acc += "<li>" + elem + "</li>";
        return acc;
      }, "<ul>");
    res.send(html + "</ul>");
  });
});

// 로그인. http://localhost:3000/login/user01/1111
app.get("/login/:id/:pw", async (req, res) => {
  const { id, pw } = req.params;
  let result = await pool.query(
    `select user_pw, salt from users where user_id = ?`,
    [id]
  );
  // 사용자 없는 경우 => 존재하지 않는 아이디입니다!
  if (!result[0].length) {
    res.send("존재하지 않는 아이디입니다!");
    return;
  }

  const { user_pw, salt } = result[0][0];
  let data = await createEncPassword(pw, salt);
  // console.log(data.password, data.salt);

  // 비교.
  console.log(data.password);
  console.log(user_pw);
  console.log(data.password == user_pw);

  // 로그인성공/ 로그인실패.
  if (data.password == user_pw) {
    res.send("로그인성공");
  } else {
    res.send("로그인실패");
  }
});

// 조회.
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("select * from users");
    console.log(result[0]); // [[],[]]
  } catch (err) {
    console.log(err);
  }
  res.send("done");
});

// 등록.
app.post("/user", async (req, res) => {
  console.log(req.body);
  const { id, pw, name } = req.body;
  // 암호화.
  const salt = await new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        reject(err);
        return;
      }
      // 암호화된듯한 구문.
      const salt = buf.toString("base64");
      resolve(salt);
    }); // end of randomBytes.
  });
  let result = await createEncPassword(pw, salt);
  // end of 암호화.

  // db insert.
  let rows = await pool.execute("insert into users values (?,?,?,?)", [
    id,
    result.password,
    result.salt,
    name,
  ]);
  console.log(rows);
  if (rows[0].affectedRows == 1) {
    res.send(`정상적으로 등록됨 id(${id})`);
  } else {
    res.send("예외발생."); // 텍스트, html, json
  }
});

// 서버실행.
app.listen(PORT, () => {
  console.log(`server running .. http://localhost:${PORT}`);
});
