const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Treatment = new Schema(
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
module.exports = mongoose.model("Treatment", Treatment);
