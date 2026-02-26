const authService = require("../services/authService");

// 회원가입.
const signup = async (req, res) => {
  const { loginId, name, password, role } = req.body;
  await authService.signup(loginId, name, password, role);

  res.json({ retCode: "OK" });
};

// 로그인.
const login = async (req, res) => {
  const { loginId, password } = req.body;
  const user = await authService.login(loginId, password);
  // 로그인 성공/실패 ?
  if (user) {
    // falsy처리[null, '', 0, undefined]
    // session 객체에 member_id, login_id, name 저장.
    const { member_id, login_id, name } = user;
    req.session.user = { member_id, login_id, name };

    res.json({ retCode: "OK" });
  } else {
    res.json({ retCode: "NG" });
  }
};

module.exports = { signup, login };
