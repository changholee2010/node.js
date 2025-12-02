// repository/post.repository.js
const pool = require("../config/db.config");

class PostRepository {
  // 💡 모든 게시글을 조회하는 함수
  async findAll() {
    // SQL 쿼리를 실행하고 결과를 반환합니다.
    const [rows] = await pool.query(
      "SELECT * FROM board ORDER BY board_id DESC"
    );
    return rows;
  }

  // 💡 ID로 특정 게시글을 조회하는 함수
  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM board WHERE board_id = ?", [
      id,
    ]);
    return rows[0]; // 단일 객체 반환
  }

  // 💡 새 게시글을 생성하는 함수
  async create(title, content, author) {
    const [result] = await pool.query(
      "INSERT INTO board (title, content, author) VALUES (?, ?, ?)",
      [title, content, author]
    );
    // 삽입된 레코드의 ID 반환
    return result.insertId;
  }

  // 수정함수
  async modify(id, title, content) {
    const [result] = await pool.query(
      `update board set title = ?, content = ? where board_id = ?`,
      [id, title, content]
    );
    return result.affectedRows;
  }
}

module.exports = new PostRepository();
