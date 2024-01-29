const express = require("express");
const { createAsset } = require("../controllers/assets.controller");
const router = express.Router();

router.route("/").post(createAsset);

module.exports = router;
