const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ProfileMaster = new Schema( 
  {
    icon: [{ id: mongoose.Types.ObjectId, name: String }],
    title: String,
    CTA: String,
    discountCTA :String,
    discountedCTA  :String,
    duration: String,
    details: String,
    precautions: String,
    whatIsThisTest :String,
    understandingTestResult:String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ProfileMaster", ProfileMaster);
