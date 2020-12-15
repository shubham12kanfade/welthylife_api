const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Answers = new Schema(
  {
    doctorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    questionId: {
      type: mongoose.Types.ObjectId,
      ref: "Questions",
    },
    answer: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Answers", Answers);
