const express = require("express");
const router = express.Router();

const { createAssetCategories } = require("../controllers/categories.controller");

router.route("/assetCategories").post(createAssetCategories);
router.route("/").get((req, res) => res.send("HELLO"));

module.exports = router;
