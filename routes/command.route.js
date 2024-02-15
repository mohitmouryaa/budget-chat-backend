const express = require("express");
const router = express.Router();

const { runCommand } = require("../controllers/command.controller");
const { protect } = require("../controllers/auth.controller");

router.use(protect);
router.route("/runCommand").post(runCommand);

module.exports = router;
