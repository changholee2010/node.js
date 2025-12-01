// 회원등록,수정 라우팅정보.
const express = require("express");
const router = express.Router(); // 인스턴스.
const crypto = require("crypto");
const { pool, createEncPassword } = require("../db");

router.get("/", (req, res) => {
  res.send("/users root 경로입니다.");
});

// 로그인. http://localhost:3000/login/user01/1111
router.get("/login/:id/:pw", async (req, res) => {
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
router.get("/users", async (req, res) => {
  try {
    const result = await pool.query("select * from users");
    console.log(result[0]); // [[],[]]
  } catch (err) {
    console.log(err);
  }
  res.send("done");
});

// 수정.
router.put("/user", async (req, res) => {
  const { id, name } = req.body;
  // db update.
  let rows = await pool.execute(
    `update users
     set    user_nm = ?
     where user_id = ?`,
    [name, id]
  );
  console.log(rows);
  if (rows[0].affectedRows == 1) {
    res.json({ retCode: "OK", retVal: "정상적으로 수정됨." });
  } else {
    resjson({ retCode: "NG", retVal: "처리중 예외발생." }); // 텍스트, html, json
  }
});

// 등록.
router.post("/user", async (req, res) => {
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

module.exports = router;
