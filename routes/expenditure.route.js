const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/auth.controller");
const { createExpenditureCategory } = require("./../controllers/categories.controller");
const { createExpenditure } = require("../controllers/expenditure.controller");

router.use(protect);
router.route("/").post(createExpenditure);
router.route("/category").post(createExpenditureCategory);

module.exports = router;
