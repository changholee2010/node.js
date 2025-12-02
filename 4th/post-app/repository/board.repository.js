// repository/board.repository.js
const pool = require("../config/db.config"); // DB 연결 정보 가정

class BoardRepository {
  // 1. 💡 생성 (CREATE)
  async create(title, content, author, images) {
    const [result] = await pool.query(
      "INSERT INTO board (title, content, author, images) VALUES (?, ?, ?, ?)",
      [title, content, author, images]
    );
    return result.insertId;
  }

  // 2. 💡 전체 목록 및 검색 (READ ALL & SEARCH)
  // searchKeyword가 있으면 제목(title) 또는 내용(content)에서 검색
  async findAll(searchKeyword) {
    let query =
      "SELECT board_id, title, author, create_date, images FROM board";
    const params = [];

    if (searchKeyword) {
      query += " WHERE title LIKE ? OR content LIKE ?";
      const keyword = `%${searchKeyword}%`;
      params.push(keyword, keyword);
    }

    query += " ORDER BY board_id DESC"; // 최신순 정렬

    const [rows] = await pool.query(query, params);
    return rows;
  }

  // 3. 💡 단건 조회 (READ ONE)
  async findById(board_id) {
    const [rows] = await pool.query("SELECT * FROM board WHERE board_id = ?", [
      board_id,
    ]);
    return rows[0];
  }

  // 4. 💡 수정 (UPDATE)
  async update(board_id, title, content, images) {
    const [result] = await pool.query(
      "UPDATE board SET title = ?, content = ?, images = ? WHERE board_id = ?",
      [title, content, images, board_id]
    );
    return result.affectedRows; // 수정된 행의 개수 반환
  }

  // 5. 💡 삭제 (DELETE)
  async delete(board_id) {
    const [result] = await pool.query("DELETE FROM board WHERE board_id = ?", [
      board_id,
    ]);
    return result.affectedRows; // 삭제된 행의 개수 반환
  }
}

module.exports = new BoardRepository();
