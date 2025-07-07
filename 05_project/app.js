const express = require("express");
require("dotenv").config({ path: "./mysql/.env" });

const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser"); // express

const app = express();

// body-parser
app.use(express.json());

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Root Router");
});

app.post("/api/:alias", async (req, res) => {
  // 라우팅정보를 통해서 실행할 쿼리지정.localhost:3000/api/productDetail
  // console.log(req.params.alias);
  // console.log(req.body.param); // param: {pn:'', pp:23, ....}
  // console.log(req.body.where);

  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});
