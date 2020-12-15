const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const HealthFeeds = new Schema(
  {
    title: String,
    description: String,
    image: String,
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("HealthFeeds", HealthFeeds);
