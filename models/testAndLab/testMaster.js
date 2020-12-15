const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const TestMaster = new Schema(
  {
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
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
module.exports = mongoose.model("TestMaster", TestMaster);
