const express = require("express");
const fs = require("fs");
const cors = require("cors");

const userRoute = require("./routes/users"); // 회원정보.
const boardRoute = require("./routes/board"); // 게시글정보.

const app = express();
const PORT = 3000;

// 셋업.
app.use(cors());
app.use(express.json({ limit: "20mb" })); // 요청정보 body : json 처리.

app.use("/user", userRoute); // http://localhost:3000/user/login
app.use("/board", boardRoute); // http://localhost:3000/board/board

app.use(express.static("public")); // p127.
app.use(express.static("uploads")); // p127.

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

// 서버실행.
app.listen(PORT, () => {
  console.log(`server running .. http://localhost:${PORT}`);
});
