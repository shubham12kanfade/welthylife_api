const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const usersCarts = new Schema(
  {
    quantity: { type: Number, default: 1 },
    ammount: Number,
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
    },
    packageId: {
      type: mongoose.Types.ObjectId,
      ref: "LabPackages",
    },
    profileId: {
      type: mongoose.Types.ObjectId,
      ref: "LabProfiles",
    },
    testId: {
      type: mongoose.Types.ObjectId,
      ref: "labTests",
    },
    labId: {
      type: mongoose.Types.ObjectId,
      ref: "Lab",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
    },
    type: {
      type: String,
      enum: ["Product", "Test", "Package", "Profile"],
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
module.exports = mongoose.model("usersCarts", usersCarts);
