const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const DoctorsSymptoms = new Schema(
  {
    doctorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    symptomId: {
      type: String,
      ref: "Symptoms",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("DoctorsSymptoms", DoctorsSymptoms);
