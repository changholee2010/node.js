const express = require("express");
require("dotenv").config({ path: "./mysql/.env" });
const fs = require("fs");
const path = require("path");

const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser"); // express

const app = express(); // 인스턴스 생성.

// 업로드 경로 확인.
let uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  // D://Dev/git..../05_project/uploads
  fs.mkdirSync(uploadDir);
}

// body-parser
app.use(express.json({ limit: "10mb" }));

app.listen(3000, () => {
  console.log("npm install");
  console.log("http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Root Router");
});

app.get("/fileupload", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); //
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
app.post("/upload/:filename/:pid", (req, res) => {
  const { filename, pid } = req.params; // {filename: 'sample.jpg', product: 3}
  // const filePath = `${__dirname}/uploads/${pid}/${filename}`; // ../05_project/uploads/sample.jpg
  let productDir = path.join(uploadDir, pid);
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir);
  }

  const safeFilename = path.basename(filename); // 경로공격.
  const filePath = path.join(uploadDir, pid, safeFilename);

  try {
    let base64Data = req.body.data;
    let data = base64Data.slice(base64Data.indexOf(";base64,") + 8);
    fs.writeFile(filePath, data, "base64", (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("error");
      }
      res.send("success");
    });
  } catch (err) {
    console.error(err);
    res.status(400).send("invalid data");
  }
});

// 데이터 쿼리.
app.post("/api/:alias", async (req, res) => {
  // 라우팅정보를 통해서 실행할 쿼리지정.localhost:3000/api/productDetail
  // console.log(req.params.alias);
  console.log(req.body.param); // param: {pn:'', pp:23, ....}
  // console.log(req.body.where);

  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});
