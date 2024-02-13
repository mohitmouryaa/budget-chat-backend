const express = require("express");
const { createChat, updateChat, getUserChat } = require("../controllers/chat.controller");
const router = express.Router();

router.route("/").get(getUserChat).post(createChat).patch(updateChat);

module.exports = router;
