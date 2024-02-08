const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Asset", "Expenditure"],
  },
  assetCategoryId: {
    type: mongoose.SchemaTypes.Mixed,
    ref: "AssetCategory",
    default: null,
  },
  expenditureCategoryId: {
    type: mongoose.SchemaTypes.Mixed,
    ref: "ExpenditureCategory",
    default: null,
  },
  assetId: {
    type: mongoose.Schema.ObjectId,
    ref: "Asset",
    required: [true, "Please enter a valid Asset ID"],
  },
  amount: {
    type: Number,
    required: [true, "Please enter an amount for the trasaction!"],
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
