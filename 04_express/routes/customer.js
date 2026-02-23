// customer 와 관련된 라우팅 정보.
const router = require("express").Router();
const path = require("path"); // path 임포트.

// http요청방식 + end point => CRUD 처리(REST 방식)
router.get(
  "/search",
  (req, res, next) => {
    console.log("middleware 요청");
    next();
  },
  (req, res) => {
    // res.redirect("/");
    // res.download(path.join(__dirname, "red.jpg"));
    console.log("응답처리중.");
    res.json({ retCode: "Success", retMsg: "Server Status 200" });
  },
);

router.post("/add", (req, res) => {
  res.send("Post방식 요청.");
});

// Get요청(parameter로처리.) => req.params 처리가능.
// Post요청(body에 데이터 해석) => req.body 해석.
router.post("/login", (req, res) => {
  console.log(req.body);
  res.send("login page.");
});

// compression() 미들웨어 적용. http://localhost:3000/customer/download
router.get("/download", (req, res) => {
  // res.send("compression() 모듈적용.");
  res.download(path.join(__dirname, "..", "red.jpg"));
});

router.get("/error", (req, res) => {
  throw new Error("에러발생");
});

module.exports = router; // 익스포트.
