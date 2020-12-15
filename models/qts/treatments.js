const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Treatment = new Schema(
  {
    specializationId: {
      type: mongoose.Types.ObjectId,
      ref: "Specialization",
    },
    doctorId: String,
    fullName: String,
    shortName: String,
    icon: String,
    discription: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Treatment", Treatment);
