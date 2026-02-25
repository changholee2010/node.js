const cron = require("node-cron");
const { logger } = require("./winston");
require("dotenv").config();
const nodemailer = require("./nodemailer");
// 주기적으로 실행.

cron.schedule("0 50 12 * * *", () => {
  // console.log(Date.now());
  nodemailer.send({
    from: "leadon@daum.net",
    to: "cholee@yedam.ac",
    subject: "스케줄러 실행",
    text: "node cron 실행합니다.",
  });
  logger.info("메일 발송.");
});
