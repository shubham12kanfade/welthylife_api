const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ProfileMaster = new Schema(
  {
<<<<<<< HEAD
    icon: [{ id: mongoose.Types.ObjectId, name: String }],
=======
    icon: [
      {
        type : String
      }
    ],
>>>>>>> 8eac97ce3f55dfe3dbb4ffc9e4801d787b7a5825
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
