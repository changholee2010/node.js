const bcrypt = require("bcrypt");
const authModel = require("../models/memberModel");

// 회원등록.
async function signup(loginId, name, password, role) {
  const hashed = await bcrypt.hash(password, 10); // 암호화.
  console.log(hashed);
  return authModel.createMember(loginId, name, hashed, role);
}

// 로그인.
async function login(loginId, password) {
  const [rows] = await authModel.findMemberById(loginId);
  // 조회된 결과 없으면 실패.
  if (rows.length == 0) {
    return null;
  }
  // 평문:password 비교> rows[0].password
  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);
  console.log(match);
  //
  if (!match) {
    return null;
  }
  // 정상.
  return user; // token
}

module.exports = { signup, login };
