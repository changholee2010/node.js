// config/db.config.js
const mysql = require("mysql2/promise");

// 💡 MySQL 연결 풀 설정 (실제 환경에 맞게 정보를 수정해야 합니다.)
const pool = mysql.createPool({
  host: "192.168.0.45",
  user: "dev01", // 사용자 이름으로 변경
  password: "dev01", // 비밀번호로 변경
  database: "dev", // 데이터베이스 이름으로 변경
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 연결 테스트
pool
  .getConnection()
  .then((connection) => {
    console.log("MySQL Pool Connection Successful!");
    connection.release();
  })
  .catch((err) => {
    console.error("MySQL Pool Connection Failed:", err.message);
    // 실제 애플리케이션에서는 여기서 프로세스를 종료할 수 있습니다.
  });

module.exports = pool;
