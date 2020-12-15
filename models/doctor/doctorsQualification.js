const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const DoctorsQualification = new Schema(
  {
    doctorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    qualificationId: {
      type: String,
      // ref: 'Qualification'
    },
    completionYear: String,
    college: String,
    degree: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("DoctorsQualification", DoctorsQualification);
