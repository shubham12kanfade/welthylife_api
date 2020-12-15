const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Token = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    deviceToken: String,
    platform: String,
  },
);
module.exports = mongoose.model("Token", Token);
