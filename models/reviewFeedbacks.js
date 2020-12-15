const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const reviewFeedbacks = new Schema(
  {
    feedback: String,

    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewId: {
      type: mongoose.Types.ObjectId,
      ref: "CustomerReviews",
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
module.exports = mongoose.model("reviewFeedbacks", reviewFeedbacks);
