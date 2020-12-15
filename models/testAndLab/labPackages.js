const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const LabPackages = new Schema(
  {
    packageId: {
      type: mongoose.Types.ObjectId,
      ref: "PackageMaster",
    },
    labId: {
      type: mongoose.Types.ObjectId,
      ref: "Lab",
    },
    centerId: {
      type: mongoose.Types.ObjectId,
      ref: "LabCenter",
    },
    title: String,
    description: String,
    precaution: String,
    PPL: String,
    mrp: String,
    discountOffer: String,
    city: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("LabPackages", LabPackages);
