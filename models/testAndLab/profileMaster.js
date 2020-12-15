const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ProfileMaster = new Schema(
  {
    icon: String,
    title: String,
    CTA: String,
    duration: String,
    details: String,
    precautions: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ProfileMaster", ProfileMaster);
