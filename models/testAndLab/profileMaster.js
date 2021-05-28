const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ProfileMaster = new Schema( 
  {
<<<<<<< HEAD
    icon: [
      {
        type : String
      }
    ],
=======
    icon: [{ id: mongoose.Types.ObjectId, name: String }],
>>>>>>> 21a08eed729d38944fd2e9684238b3bb58870b2f
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
