// express 인스턴스.
const express = require("express");
require("dotenv").config();

// 서버 인스턴스.
const app = express();
app.use(express.static("public"));
// json body-parser.
app.use(express.json());

// 라우팅.
app.use("/api/board", require("./routes/boardRoutes"));

// 서버 시작.
app.listen(3000, () => {
  console.log("http://localhost:3000 is running...");
});
