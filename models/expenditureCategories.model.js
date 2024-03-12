const mongoose = require("mongoose");
const categorySchema = require("./category.schema");

const expenditureCategorySchema = new mongoose.Schema(
  {
    categories: [categorySchema],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: new mongoose.Types.ObjectId("65c1d927921def8a69892609"),
      required: [true, "An Expenditure Category must have a user id!"],
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


const ExpenditureCategory = mongoose.model("ExpenditureCategory", expenditureCategorySchema);

module.exports = ExpenditureCategory;
