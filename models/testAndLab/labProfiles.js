const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const LabProfiles = new Schema(
  {
    labId: {
      type: mongoose.Types.ObjectId,
      ref: "Lab",
    },
    profileId: {
      type: mongoose.Types.ObjectId,
      ref: "ProfileMaster",
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
module.exports = mongoose.model("LabProfiles", LabProfiles);
