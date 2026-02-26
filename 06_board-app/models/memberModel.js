const pool = require("../config/db");

// 글등록(insert)
async function createMember(loginId, name, password, role) {
  const sql = `insert into tbl_member (login_id, name, password, role) 
               values (?, ?, ?, ?)`;
  return pool.query(sql, [loginId, name, password, role]);
}

// 조회.
async function findMemberById(loginId) {
  const sql = `select * from tbl_member where login_id = ?`;
  return pool.query(sql, [loginId]);
}

// 모듈 export
module.exports = { createMember, findMemberById };
