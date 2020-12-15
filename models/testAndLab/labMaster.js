const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Lab = new Schema(
  {
    icon: String,
    name: String,
    email: String,
    doc1: Array,
    mobileNumber: String,
    altMobileNumber: String,
    type: {
      type: String,
    },
    location: {
      country: String,
      state: String,
      city: String,
      address: String,
      landmark: String,
      pincode: String,
    },
    regCertNo: String,
    about: String,
    isFeatured: {
      type: Boolean,
      default: false,
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
module.exports = mongoose.model("Lab", Lab);
