const jwt = require("jsonwebtoken");
const authCheck = async (req, res, next) => {
  console.log("middleware1....");
  if (req.session.user) {
    next();
  } else {
    return res.send({ retCode: "NG", retMsg: "권한이 없음." });
  }
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader); // Bearer djfkldafjkdslf

  if (!authHeader) {
    return res.json({ retCode: "NG", retMsg: "토큰값이 없음." });
  }
  // 정상처리.
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "secret-token");
    req.user = decoded;
    next();
  } catch (err) {
    return res.json({ retCode: "NG", retMsg: "토큰 오류." });
  }
};

module.exports = { authCheck, verifyToken };
