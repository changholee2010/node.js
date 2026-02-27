// 업무.
const boardModel = require("../models/boardModel");

// 서비스 - 모델 => 1:1매칭.
// 글목록조회 업무.
async function getList() {
  return boardModel.getList();
}
// 단건조회 업무.
async function getDetail(id) {
  return boardModel.getById(id);
}
// 등록(create)
async function create(title, content, writerId) {
  return boardModel.insert(title, content, writerId);
}
// 삭제(remove)
async function remove(board_id, user) {
  const [rows] = await boardModel.getById(board_id);
  const board = rows[0];
  console.log(board);
  // 권한체크.
  if (board.writer_id != user.member_id) {
    return "NO_AUTH";
  }

  return boardModel.remove(board_id);
}

module.exports = { getList, getDetail, create, remove };
