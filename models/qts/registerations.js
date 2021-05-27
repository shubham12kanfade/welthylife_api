const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Registration = new Schema(
  {
    no: String,
    council: String,
    year: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Registration", Registration);
