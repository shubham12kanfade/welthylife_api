const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const DoctorDocs = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    docs: Array,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("DoctorDocs", DoctorDocs);
