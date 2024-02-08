const express = require("express");
const router = express.Router();

const { runCommand } = require("../controllers/command.controller");

router.route("/runCommand").post(runCommand);
router.route("/").get((req, res) => res.send("HELLO"));

module.exports = router;
