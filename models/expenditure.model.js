const mongoose = require("mongoose");
const slugify = require("slugify");

const { Schema } = mongoose;

const expenditureSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "An expenditure must have a name!"],
      trim: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: [true, "An expenditure must have a balance!"],
    },
    category: {
      type: Schema.ObjectId,
      ref: "ExpenditureCategory",
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
expenditureSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
expenditureSchema.pre(/^find/, function (next) {
  this.populate("category");
  next();
});

const Expenditure = mongoose.model("Expenditure", expenditureSchema);

module.exports = Expenditure;
