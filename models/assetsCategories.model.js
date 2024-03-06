const mongoose = require("mongoose");
const slugify = require("slugify");

const assetCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An Asset Catgory must have a name!"],
      unique: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: new mongoose.Types.ObjectId("65c1d927921def8a69892609"),
      required: [true, "An Asset Category must have a user id!"],
    },
    slug: {
      type: String,
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

// DOCUMENT MIDDLEWARE
assetCategoriesSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const AssetCategory = mongoose.model("AssetCategory", assetCategoriesSchema);

module.exports = AssetCategory;
