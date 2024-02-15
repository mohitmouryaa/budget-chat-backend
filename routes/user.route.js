const express = require("express");
const router = express.Router();

const authController = require("./../controllers/auth.controller");

router.use(authController.protect)
router.route("/auth/google/callback").post(authController.googleAuth);
router.route("/").get((req, res) => res.send("HELLO"));

module.exports = router;
