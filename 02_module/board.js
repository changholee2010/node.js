function boardList() {
  return [
    { bno: 1, title: "1번글제목", content: "1번글내용", writer: "user01" },
    { bno: 2, title: "2번글제목", content: "2번글내용", writer: "user02" },
  ];
}
const userName = "Hong";
const age = 20;

module.exports = { boardList, userName };
