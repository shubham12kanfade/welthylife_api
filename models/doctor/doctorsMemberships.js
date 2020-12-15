const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const DoctorsMemberships = new Schema(
  {
    doctorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    membershipId: {
      type: mongoose.Types.ObjectId,
      ref: "Memberships",
    },
    date: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("DoctorsMemberships", DoctorsMemberships);
