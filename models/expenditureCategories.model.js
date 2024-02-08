const mongoose = require("mongoose");
const slugify = require("slugify");

const expenditureCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An Expenditure Catgory must have a name!"],
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
expenditureCategoriesSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const ExpenditureCategory = mongoose.model("ExpenditureCategory", expenditureCategoriesSchema);

module.exports = ExpenditureCategory;
