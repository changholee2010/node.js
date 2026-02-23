// multer.js
const multer = require("multer");
const path = require("path");
// 한글 (latin1) -> Buffer -> utf8 인코딩
// 딸기.jpg
// multer 미들웨어 업로드(업로드 경로, 업로드 파일 rename)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    // 한글명 파일 처리.
    const encfile = Buffer.from(file.originalname, "latin1").toString("utf-8");
    const fn = path.basename(encfile, path.extname(encfile));
    const ext = path.extname(encfile);
    const uniqueName = fn + "_" + new Date().valueOf() + ext; // .jpg;
    cb(null, uniqueName);
  },
});

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    console.log(file);
    // 한글명 파일 처리.
    const encfile = Buffer.from(file.originalname, "latin1").toString("utf-8");
    const fn = path.basename(encfile, path.extname(encfile));
    const ext = path.extname(encfile);
    const uniqueName = fn + "_" + new Date().valueOf() + ext; // .jpg;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });
const upload2 = multer({ storage: storage2 });

module.exports = { upload, upload2 };
