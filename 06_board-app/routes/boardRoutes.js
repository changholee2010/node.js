const router = require("express").Router();
const ctrl = require("../controllers/boardController");
const mid = require("../middleware/auth");

// 조회(Get요청).
router.get("/", ctrl.list); // http://localhost:3000/board/
router.get("/:id", ctrl.detail);

// CUD
router.post("/", mid.verifyToken, ctrl.create); // 글등록.
router.delete("/:id", mid.verifyToken, ctrl.remove); // 글삭제.

module.exports = router;
