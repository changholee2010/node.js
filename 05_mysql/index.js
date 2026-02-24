const mysql = require("mysql");
const sql = require("./sql");

// connection pool
const pool = mysql.createPool({
  connectionLimit: process.env.MYSQL_LIMIT,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

// query 함수.
const query = async (alias, values) => {
  return new Promise((resolve, reject) => {
    pool.query(
      sql[alias], // 1) sql구문.
      values, // 2) query parameter => [값1, 값2, ...]
      (error, results) => {
        if (error) {
          console.log(err);
          reject({ error });
        } else {
          resolve(results);
        }
      }, // 3) callback함수.
    );
  });
};

// async function exe() {
//   const result = await query("customerInsert", [
//     "박우신",
//     "park@email.com",
//     "010-1234-1234",
//   ]);
//   console.log(result);
// }
// exe();
module.exports = { query };
