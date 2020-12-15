const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const CustomerReviews = new Schema(
  {
    title: String,
    review: String,
    stars: Number,
    reviewType: {
      type: String,
      enum: [
        "Chat",
        "Appoinment",
        "Product",
        "Medicine",
        "HappyCustomers",
        "HCProviders",
        "Doctor",
        "AppUsers",
        "Labs",
      ],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    doctorId: {
      type: mongoose.Types.ObjectId,
    },
    feedbackId: {
      type: mongoose.Types.ObjectId,
      ref: "reviewFeedbacks",
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
module.exports = mongoose.model("CustomerReviews", CustomerReviews);
