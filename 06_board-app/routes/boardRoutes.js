const router = require("express").Router();
const ctrl = require("../controllers/boardController");
const mid = require("../middleware/auth");

// 조회(Get요청).
router.get("/", mid.authCheck, ctrl.list); // http://localhost:3000/board/
router.get("/:id", ctrl.detail);

// CUD
router.post("/", mid.verifyToken, ctrl.create);

module.exports = router;
