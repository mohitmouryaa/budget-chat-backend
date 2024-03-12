const express = require("express");
const { createTransaction } = require("../controllers/transaction.controller");
const { protect } = require("../controllers/auth.controller");
const router = express.Router();

router.use(protect);
router.route("/").post(createTransaction);

module.exports = router;
