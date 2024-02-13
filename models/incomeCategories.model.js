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
      default: mongoose.Types.ObjectId("65c1d927921def8a69892609"),
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
