const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const PackageTest = new Schema(
  {
    packageId: {
      type: mongoose.Types.ObjectId,
      ref: "PackageMaster",
    },
    profileId: {
      type: mongoose.Types.ObjectId,
      ref: "ProfileMaster",
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("PackageTest", PackageTest);
