const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An Asset Category must have a name!"],
    unique: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: String,
    enum: ["User", "System"],
    default: "System",
  },
  slug: String,
});

// DOCUMENT MIDDLEWARE
categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = categorySchema;
