const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Symptoms = new Schema(
  {
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
module.exports = mongoose.model("Symptoms", Symptoms);
