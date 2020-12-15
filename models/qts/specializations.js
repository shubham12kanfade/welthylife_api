const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Specialization = new Schema(
  {
    fullName: String,
    shortName: String,
    icon: String,
    backImg: String,
    searched: {
      type: Number,
      default: 0,
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
module.exports = mongoose.model("Specialization", Specialization);
