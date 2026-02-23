// product 와 관련된 라우팅 정보.
const router = require("express").Router();
const { upload2 } = require("../middleware/multer");

router.get("/", (req, res) => {
  res.send("/product 의 Root 페이지.");
});

router.post("/upload_file", upload2.array("myImg"), (req, res) => {
  console.log(req.body);
  res.send("파일업로드 테스트");
});
module.exports = router;
