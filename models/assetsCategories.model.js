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
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: new mongoose.Types.ObjectId("65b8da1f7524e11b2a87873e"),
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
