const express = require("express"); // 임포트.
const fs = require("fs");
const app = express(); // 인스턴스.
const customerRoute = require("./routes/customer");

// 정적파일 폴더(html,css,js)
app.use(express.static("public"));

// body parser 셋업.
app.use(express.urlencoded()); // x-www-form-urlencoded
app.use(express.json()); // json

// 라우팅. 요청방식+URL(end point) => 실행할 함수.
app.get("/", (req, res) => {
  res.status(200).send("서버실행...");
});

// 외부 라우팅정보.
app.use("/customer", customerRoute);
app.use("/product", require("./routes/product"));

// express 에서 에러처리.
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ statusCode: res.statusCode, errMsg: err.message });
});

// 서버실행.
app.listen(3000, () => {
  console.log(`서버실행... http://localhost:3000`);
});
