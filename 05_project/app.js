const express = require("express");
require("dotenv").config({ path: "./mysql/.env" });
const fs = require("fs");

const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser"); // express

const app = express();

// body-parser
app.use(express.json());

app.listen(3000, () => {
  console.log("npm install");
  console.log("http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Root Router");
});

// 다운로드.
app.get("/download/:productId/:fileName", (req, res) => {
  const { productId, fileName } = req.params;
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`;
  // 응답정보.
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  );
  if (!fs.existsSync(filepath)) {
    console.log("파일이 없습니다.");
    return res.status(404).json({ error: "Can not found file." });
  } else {
    fs.createReadStream(filepath).pipe(res);
    // res.send("다운로드 완료.");
  }
});

// 업로드.

// 데이터 쿼리.
app.post("/api/:alias", async (req, res) => {
  // 라우팅정보를 통해서 실행할 쿼리지정.localhost:3000/api/productDetail
  // console.log(req.params.alias);
  console.log(req.body.param); // param: {pn:'', pp:23, ....}
  // console.log(req.body.where);

  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});
