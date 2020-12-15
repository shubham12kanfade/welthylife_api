const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Questions = new Schema(
  {
    patientId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    question: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Questions", Questions);
