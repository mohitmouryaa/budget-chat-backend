const express = require("express");
const { protect } = require("../controllers/auth.controller");
const { createIncomeCategory } = require("../controllers/categories.controller");
const router = express.Router();

router.use(protect);
router.route("/category").post(createIncomeCategory);
module.exports = router;
