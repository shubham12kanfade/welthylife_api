const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const MemberTimings = new Schema({
  clinicId: {
    type: mongoose.Types.ObjectId,
    ref: "Clinic",
  },
  doctorId: {
    type: mongoose.Types.ObjectId,
    ref: "Location",
  },
  timing: {
    monday: {
      startTime: String,
      endTime: String,
    },
    tuesday: {
      startTime: String,
      endTime: String,
    },
    wednesday: {
      startTime: String,
      endTime: String,
    },
    thursday: {
      startTime: String,
      endTime: String,
    },
    friday: {
      startTime: String,
      endTime: String,
    },
    saturday: {
      startTime: String,
      endTime: String,
    },
    sunday: {
      startTime: String,
      endTime: String,
    },
  }
}, {
  timestamps: true,
});
module.exports = mongoose.model("MemberTimings", MemberTimings);