const mongoose = require("mongoose");
const slugify = require("slugify");

const { Schema } = mongoose;

const assetSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "An asset must have a name!"],
      trim: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: [true, "An asset must have a balance!"],
    },
    category: {
      type: Schema.ObjectId,
      ref: "AssetCategory",
      required: true,
    },
    slug: {
      type: String,
    },
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
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
assetSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
assetSchema.pre(/^find/, function (next) {
  this.populate("category");
  next();
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
