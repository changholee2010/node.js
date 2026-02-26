// 컨트롤(라우트 핸들러)
const boardService = require("../services/boardService");

const list = async (req, res) => {
  const [rows] = await boardService.getList();
  res.json(rows); // 화면에 출력될 결과.
};

// 상세조회.
const detail = async (req, res) => {
  const { id } = req.params;
  const [rows] = await boardService.getDetail(id);
  res.json(rows);
};

// 등록(create)
const create = async (req, res) => {
  const { title, content, writerId } = req.body;
  // 성공/실패 구분.
  try {
    await boardService.create(title, content, writerId);
    res.json({ retCode: "OK" });
  } catch (err) {
    console.log(err);
    const msg = err ? err.sqlMessage : "알 수 없는 예외발생";
    res.json({ retCode: "NG", retMsg: msg });
  }
};

module.exports = { list, detail, create };
