const express = require("express");
const router = express.Router();

const authController = require("./../controllers/auth.controller");
const { getMe } = require("../controllers/user.controller");

router.route("/auth/google/callback").post(authController.googleAuth);
router.use(authController.protect);
router.route("/get-me").get(getMe);

module.exports = router;
