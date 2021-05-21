const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const TestMaster = new Schema({
  playlists: [{
    name: String,
    videos: Array
  }],
  addedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  icon: [{
    fileURL: {
      type: String
    }
  }],
  title: String,
  CTA: String,
  discountCTA: String,
  discountedCTA: String,
  duration: String,
  details: String,
  precautions: String,
  whatIsThisTest: String,
  understandingTestResult: String,
  status: {
    type: String,
    default: "active",
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model("TestMaster", TestMaster);