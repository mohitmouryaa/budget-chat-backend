const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Income", "Expense"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "A chat must have a User Id"],
  },
  income: {
    type: mongoose.Schema.ObjectId,
    ref: "IncomeCategory",
    default: null,
  },
  expenditure: {
    type: mongoose.Schema.ObjectId,
    ref: "ExpenditureCategory",
    default: null,
  },
  asset: {
    type: mongoose.Schema.ObjectId,
    ref: "Asset",
    required: [true, "An transaction must have a related Asset"],
  },
  amount: {
    type: Number,
    required: [true, "Please enter an amount for the trasaction!"],
  },
  note: {
    type: String,
    default: null,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
