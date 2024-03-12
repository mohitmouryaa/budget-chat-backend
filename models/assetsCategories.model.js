const mongoose = require("mongoose");
const categorySchema = require("./category.schema");

const assetCategoriesSchema = new mongoose.Schema(
  {
    categories: [categorySchema],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: new mongoose.Types.ObjectId("65c1d927921def8a69892609"),
      required: [true, "An Asset Category must have a user id!"],
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

const AssetCategory = mongoose.model("AssetCategory", assetCategoriesSchema);

module.exports = AssetCategory;
