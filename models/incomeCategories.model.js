const mongoose = require("mongoose");
const categorySchema = require("./category.schema");

const incomeCategory = new mongoose.Schema(
  {
    categories: [categorySchema],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: new mongoose.Types.ObjectId("65c1d927921def8a69892609"),
      required: [true, "An Income Category must have a user id!"],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

const IncomeCategory = mongoose.model("IncomeCategory", incomeCategory);

module.exports = IncomeCategory;
