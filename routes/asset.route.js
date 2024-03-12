const express = require("express");
const router = express.Router();
const { createAsset, getAllAssets } = require("../controllers/asset.controller");
const { protect } = require("../controllers/auth.controller");
const { createAssetCategory } = require("../controllers/categories.controller");

router.use(protect);
router.route("/").get(getAllAssets).post(createAsset);
router.route("/category").post(createAssetCategory);

module.exports = router;
