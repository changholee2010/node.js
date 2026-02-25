// excel.js
// 엑셀파일 읽기. readFile
// 시트중에서 첫번째 [0] -> 시트이름 읽기.
// -> json, csv, 메소드.
const xlsx = require("xlsx");
const mysql = require("./index");
const encrypto = require("./crypto");

async function excel_run(filePath) {
  // 엑셀파일 읽어들이기.
  const workbook = xlsx.readFile(filePath);
  // 첫번째 시트명 파악하기.
  const sheetName = workbook.SheetNames[0];
  // 첫번째 시트활용해서 json 포맷으로 생성.
  const firstSheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(firstSheet);

  // 파일의 등록된 정보를 활용해서 db insert.
  for (let prof of jsonData) {
    // 암호된 비밀번호로 넣기.
    const passwd = encrypto.createPassword("" + prof["비밀번호"]);
    const param = {
      name: prof["이름"],
      email: prof["이메일"],
      phone: prof["연락처"],
      passwd,
    };
    const result = await mysql.query("customerInsert", [param]);
    console.log(result);
  }
  console.log("status 1");
}

module.exports = { excel_run };
