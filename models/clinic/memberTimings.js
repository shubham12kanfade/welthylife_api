const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const MemberTimings = new Schema(
  {
    clinicId: {
      type: mongoose.Types.ObjectId,
      ref: "Clinic",
    },
    doctorId: {
      type: mongoose.Types.ObjectId,
      ref: "Location",
    },
    timing: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("MemberTimings", MemberTimings);
