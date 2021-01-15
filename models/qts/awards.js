const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Awards = new Schema(
  {
    title: String,
    descrioton: String,
    from: String,
    icon: String,
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
module.exports = mongoose.model("Awards", Awards);
