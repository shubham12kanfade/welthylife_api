const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ProfileTests = new Schema(
  {
    profileId: {
      type: mongoose.Types.ObjectId,
      ref: "ProfileMaster",
    },
    testId: {
      type: mongoose.Types.ObjectId,
      ref: "TestMaster",
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
module.exports = mongoose.model("ProfileTests", ProfileTests);
