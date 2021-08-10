const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares");
const { classrommControllers } = require("../controllers");

router.post("/", isAuthenticated, classrommControllers.makeClassroom);
router.get("/", isAuthenticated, classrommControllers.renderClassroom);

module.exports = router;
