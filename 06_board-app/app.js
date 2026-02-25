// express 인스턴스.
const express = require("express");

// 서버 인스턴스.
const app = express();

// 서버 시작.
app.listen(3000, () => {
  console.log("http://localhost:3000 is running...");
});
