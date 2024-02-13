const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "A chat must have a User Id"],
  },
  messages: [
    {
      type: {
        type: String,
        enum: ["message", "link", "command"],
        required: true,
      },
      message: {
        type: Object,
        required: true,
      },
      by: {
        type: String,
        enum: ["admin", "user"],
        required: true,
      },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
