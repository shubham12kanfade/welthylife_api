const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Qualification = new Schema(
  {
    degree: String,
    shortName: String,
    icon: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Qualification", Qualification);
