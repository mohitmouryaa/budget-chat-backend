const express = require("express");
const { createChat, updateChat, getUserChat } = require("../controllers/chat.controller");
const { protect } = require("../controllers/auth.controller");
const router = express.Router();

router.use(protect)
router.route("/").get(getUserChat).post(createChat).patch(updateChat);

module.exports = router;
