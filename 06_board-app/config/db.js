// sql구문 실행
const mysql = require("mysql2/promise");
require("dotenv").config({ path: "../.env" });

// pool 활용.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

module.exports = pool;
