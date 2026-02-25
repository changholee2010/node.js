// nodemailer.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const gmailConfig = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "gmail 아이디",
    pass: "앱 비밀먼호",
  },
};

const daumConfig = {
  host: process.env.DAUM_HOST,
  port: process.env.DAUM_PORT,
  secure: true,
  auth: {
    user: process.env.DAUM_USER,
    pass: process.env.DAUM_PASS,
  },
};

const send = async (data) => {
  return new Promise((resolve, reject) => {
    // nodemailer 모듈의 createTransport함수 => transport 객체.
    const transport = nodemailer.createTransport(daumConfig);
    // 메일발송.
    transport.sendMail(data, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(result);
      resolve(result);
    });
  });
};

// send({
//   from: "leadon@daum.net",
//   to: "cholee@yedam.ac",
//   subject: "파일첨부테스트",
//   html: "<p>파일첨부연습</p>",
//   attachments: [
//     {
//       filename: "딸기.jpg", //파일명.
//       path: __dirname + "/uploads/" + "딸기.jpg", // 실제파일
//     },
//   ],
// });
// console.log("main send....");
module.exports = { send };
