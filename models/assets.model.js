const mongoose = require("mongoose");

const { Schema } = mongoose;

const assetsSchema = new Schema({
  name: {
    type: String,
    required: [true, "An asset must have a name!"],
    trim: true,
  },
  userId: {
    type: String,
    default: "System",
  },
  isPreDefined: {
    type: Boolean,
    default: false,
  },
});

const Asset = new mongoose.model("Assets", assetsSchema);

module.exports = Asset;
