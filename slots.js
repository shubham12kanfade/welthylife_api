const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Slots = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  clinicId: {
    type: mongoose.Types.ObjectId,
    ref: "Clinic",
  },
  day: String,
  morningSlot: {
    from: String,
    fromdt: Date,
    to: String,
    todt: Date,
  },
  afternoonSlot: {
    from: String,
    fromdt: Date,
    todt: Date,
    to: String,
    fromdt: Date,
    todt: Date,
  },
  eveningSlot: {
    from: String,
    fromdt: Date,
    todt: Date,
    to: String,
    fromdt: Date,
    todt: Date,
  },
  nightSlot: {
    from: String,
    fromdt: Date,
    todt: Date,
    to: String,
    fromdt: Date,
    todt: Date,
  },
  status: {
    type: String,
    default: "active",
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model("Slots", Slots);