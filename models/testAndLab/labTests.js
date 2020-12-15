const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const labTests = new Schema(
  {
    testId: {
      type: mongoose.Types.ObjectId,
      ref: "TestMaster",
    },
    labId: {
      type: mongoose.Types.ObjectId,
      ref: "Lab",
    },
    centerId: {
      type: mongoose.Types.ObjectId,
      ref: "LabCenter",
    },
    mrp: String,
    discountOffer: String,
    description: String,
    city: String,
    PPL: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("labTests", labTests);
