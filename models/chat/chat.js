const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Chat = new Schema(
  {
    chatHead: {
      type: mongoose.Types.ObjectId,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    message: String,
    ifFile: Boolean,
    fileURL: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Chat", Chat);
