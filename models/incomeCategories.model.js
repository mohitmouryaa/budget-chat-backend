const mongoose = require("mongoose");
const slugify = require("slugify");

const incomeCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An Income Catgory must have a name!"],
      unique: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: mongoose.Types.ObjectId("65b8da1f7524e11b2a87873e"),
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
incomeCategoriesSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const IncomeCategory = mongoose.model("IncomeCategory", incomeCategoriesSchema);

module.exports = IncomeCategory;
