// repository/user.repository.js
const pool = require("../config/db.config");

class UserRepository {
  // 1. 💡 추가 (CREATE) - 회원 가입
  async create(user_id, name, password_hash, salt, phone_number) {
    const [result] = await pool.query(
      "INSERT INTO users (user_id, name, password_hash, salt, phone_number) VALUES (?, ?, ?, ?, ?)",
      [user_id, name, password_hash, salt, phone_number]
    );
    return result.affectedRows;
  }

  // 2. 💡 단건 조회 (READ) - ID로 회원 정보 조회 (비밀번호 제외)
  async findById(user_id) {
    // 보안을 위해 password_hash와 salt는 여기서 제외하고 조회
    const [rows] = await pool.query(
      "SELECT user_id, name, phone_number, created_at, updated_at FROM users WHERE user_id = ?",
      [user_id]
    );
    return rows[0];
  }

  // 2-1. 💡 인증용 단건 조회 (비밀번호 포함)
  async findByIdWithCredentials(user_id) {
    const [rows] = await pool.query(
      "SELECT user_id, password_hash, salt FROM users WHERE user_id = ?",
      [user_id]
    );
    return rows[0];
  }

  // 3. 💡 전체 조회 (READ ALL)
  async findAll() {
    const [rows] = await pool.query(
      "SELECT user_id, name, phone_number, created_at, updated_at FROM users"
    );
    return rows;
  }

  // 4. 💡 수정 (UPDATE) - 이름 및 연락처 정보만 수정
  async update(user_id, name, phone_number) {
    const [result] = await pool.query(
      "UPDATE users SET name = ?, phone_number = ? WHERE user_id = ?",
      [name, phone_number, user_id]
    );
    return result.affectedRows;
  }

  // 5. 💡 비밀번호 수정 (UPDATE PASSWORD)
  async updatePassword(user_id, password_hash, salt) {
    const [result] = await pool.query(
      "UPDATE users SET password_hash = ?, salt = ? WHERE user_id = ?",
      [password_hash, salt, user_id]
    );
    return result.affectedRows;
  }

  // 6. 💡 삭제 (DELETE)
  async delete(user_id) {
    const [result] = await pool.query("DELETE FROM users WHERE user_id = ?", [
      user_id,
    ]);
    return result.affectedRows;
  }
}

module.exports = new UserRepository();
