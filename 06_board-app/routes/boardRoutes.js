const router = require("express").Router();
const ctrl = require("../controllers/boardController");

// 조회(Get요청).
router.get("/", ctrl.list); // http://localhost:3000/board/
router.get("/:id", ctrl.detail);

// CUD
router.post("/", ctrl.create);

module.exports = router;
