const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/auth.controller");
const { createExpenditureCategories } = require("./../controllers/categories.controller");
const { createExpenditure } = require("../controllers/expenditure.controller");

router.use(protect);
router.route("/").post(createExpenditure);
router.route("/category").post(createExpenditureCategories);

module.exports = router;
