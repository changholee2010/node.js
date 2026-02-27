// 게시글 관련 CRUD 기능.
const pool = require("../config/db");

// 글목록.
async function getList() {
  const sql = `
    SELECT b.*, m.login_id, m.name
    FROM tbl_board b
    JOIN tbl_member m ON b.writer_id = m.member_id
    ORDER BY b.board_id DESC
  `;
  return pool.query(sql);
}
// 상세조회.
async function getById(id) {
  const sql = `
    SELECT b.*, m.login_id, m.name
    FROM tbl_board b
    JOIN tbl_member m ON b.writer_id = m.member_id
    WHERE b.board_id = ?
  `;
  return pool.query(sql, [id]);
}
// 글등록(insert)
async function insert(title, content, writerId) {
  const sql = `insert into tbl_board (title, content, writer_id) 
               values (?, ?, ?)`;
  return pool.query(sql, [title, content, writerId]);
}

// 글삭제(remove)
async function remove(id) {
  const sql = `delete from tbl_board where board_id = ?`;
  return pool.query(sql, [id]);
}

// 모듈 export
module.exports = { getList, getById, insert, remove };
