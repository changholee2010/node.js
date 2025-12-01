const express = require("express");
const router = express.Router();
const { pool } = require("../db");
const fs = require("fs");
const multer = require("multer");

// multer 셋업.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const originalname = //
      Buffer.from(file.originalname, "latin1").toString("utf8"); // 한글처리.
    cb(null, Date.now() + "-" + originalname);
  },
});

const upload = multer({ storage });

router.get("/", (req, res) => {
  res.send("/board root 경로입니다.");
});

// 1) 게시글 목록(boards)
router.get("/boards", async (req, res) => {
  let result = await pool.query(
    `select board_id, title, content, author, create_date, images from board order by 1`
  );
  console.log(result[0]);
  if (!result[0].length) {
    res.json({ retCode: "NG", retMsg: "조회된 결과가 없습니다." });
    return;
  }
  res.json(result[0]);
});

// 2) 게시글 등록(board)
// 글등록정보(제목,내용,작성자,images(파일명))
// 파일등록(uploads/파일)
router.post("/board", async (req, res) => {
  const contentType = req.headers["content-type"] || "";
  let renameFile = "";

  try {
    // -------------------------------------------------------
    // 1) multipart/form-data  (이미지 + form-data)
    // -------------------------------------------------------
    if (contentType.includes("multipart/form-data")) {
      // multer 실행
      await new Promise((resolve, reject) => {
        upload.single("img")(req, res, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      const { title, content, author } = req.body;

      // 업로드된 파일이 없는 경우 대비
      if (req.file) {
        renameFile = req.file.filename;
      } else {
        renameFile = ""; // 또는 null 로 저장해도 됨
      }

      // DB insert
      const [rows] = await pool.execute(
        `INSERT INTO board (title, content, author, images)
         VALUES (?, ?, ?, ?)`,
        [title, content, author, renameFile]
      );

      return res.json({
        retCode: "OK",
        retVal: `(글번호 ${rows.insertId})로 등록됨.`,
      });
    }

    // -------------------------------------------------------
    // 2) application/json  (base64 이미지 포함)
    // -------------------------------------------------------
    else if (contentType.includes("application/json")) {
      const { title, content, author, filename, base64 } = req.body;

      // base64 이미지가 있는 경우 저장
      if (filename && base64) {
        // 확장자 추출 (예: test.png → .png)
        const ext = filename.includes(".")
          ? filename.substring(filename.lastIndexOf("."))
          : "";

        renameFile = `${Date.now()}${ext}`;

        try {
          fs.writeFileSync(
            "uploads/" + renameFile,
            Buffer.from(base64, "base64")
          );
        } catch (err) {
          console.log("파일 저장 실패:", err);
          return res.json({
            retCode: "NG",
            retVal: "파일 저장 실패",
          });
        }
      } else {
        renameFile = ""; // 파일이 없는 경우
      }

      // DB insert
      const [rows] = await pool.execute(
        `INSERT INTO board (title, content, author, images)
         VALUES (?, ?, ?, ?)`,
        [title, content, author, renameFile]
      );

      return res.json({
        retCode: "OK",
        retVal: `(글번호 ${rows.insertId})로 등록됨.`,
      });
    }

    // -------------------------------------------------------
    // 3) 지원하지 않는 Content-Type
    // -------------------------------------------------------
    else {
      return res.json({
        retCode: "NG",
        retVal: "지원하지 않는 Content-Type 입니다.",
      });
    }
  } catch (err) {
    console.error("POST /board 처리 중 오류:", err);

    return res.json({
      retCode: "NG",
      retVal: "서버 내부 오류 발생",
    });
  }
});

// 3) 게시글 수정(board)
router.put("/board", async (req, res) => {
  const { id, title, content } = req.body;
  let rows = await pool.execute(
    `update board 
     set title=?
        ,content=?
     where board_id = ?`,
    [title, content, id]
  );
  if (rows[0].affectedRows == 1) {
    res.json({
      retCode: "OK",
      retVal: `(글번호 ${id})가 정상 수정됨.`,
    });
  } else {
    resjson({ retCode: "NG", retVal: "처리중 예외발생." }); // 텍스트, html, json
  }
});

// 4) 게시글 삭제(board)
router.delete("/board/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  let rows = await pool.execute(
    `delete from board
     where board_id = ?`,
    [id]
  );
  if (rows[0].affectedRows == 1) {
    res.json({
      retCode: "OK",
      retVal: `(글번호 ${id})가 정상 삭제됨.`,
    });
  } else {
    resjson({ retCode: "NG", retVal: "처리중 예외발생." }); // 텍스트, html, json
  }
});

// 5) 이미지 가져오기.
router.get("/image/:filename", async (req, res) => {
  const { filename } = req.params;
  const file = fs.readFileSync(`uploads/${filename}`, "base64");
  res.json({ file });
});

module.exports = router;
