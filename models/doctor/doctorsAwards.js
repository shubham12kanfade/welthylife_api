const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const DoctorsAwards = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    awardId: {
      type: mongoose.Types.ObjectId,
      ref: "Awards",
    },
    year: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("DoctorsAwards", DoctorsAwards);
