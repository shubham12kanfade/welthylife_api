const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Appoinment = new Schema(
  {
    petient: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    appoinmentType: {
      type: String,
      enum: ["Scheduled", "Direct"],
    },
    status: {
      type: String,
      enum: ["Booked", "Rejected", "Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "Online"],
    },
    ammount: Number,
    isPaymentDone: {
      type: Boolean,
      default: false,
    },
    date: String,
    time: String,
    slotType: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Appoinment", Appoinment);
