// 공유.
const { boardList, userName } = require("./board");
const { logger } = require("./console_class");

logger.log(userName); // 임포트 ( 익스포트 X)
let result = boardList();

for (let board of result) {
  logger.log(`글번호: ${board.bno}, 글제목: ${board.title}`);
}
