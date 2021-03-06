const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const User = new Schema({
  mobileNumber: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  registrationNumber: String,
  registrationCouncil: String,
  registrationYear: String,
  franchiseeName: String,
  designation: {
    type: String,
    enum: [
      "Admin",
      "User",
      "Doctor",
      "Hospital",
      "DeliveryBoy",
      "Vendor",
      "Franchisee",
    ],
    required: true,
  },
  isVerified: {
    type: String,
    enum: ["No", "Yes", "InVerification"],
    default: "No",
    required: true,
  },
  loginType: {
    type: String,
    enum: ["Google", "Facebook", "Password", "OTP"],
    default: "Password",
    required: true,
  },
  isMobileVerified: {
    type: String,
    enum: ["Not", "Verified"],
    default: "Not",
    required: true,
  },
  isEmailVerified: {
    type: String,
    enum: ["Not", "Verified"],
    default: "Not",
    required: true,
  },
  doctorType: {
    type: String,
    enum: ["Primary", "nonPrimary"],
    default: "nonPrimary",
    required: true,
  },
  isOnline: {
    type: Boolean,
    enum: [true, false],
    default: false,
    required: true,
  },
  prefix: String,
  specialitie: Array,
  encryptedEmail: String,
  title: String,
  firstName: String,
  middleName: String,
  lastName: String,
  otp: Number,
  otpExpires: Date,
  dob: String,
  gender: String,
  avatar: String,
  password: String,
  extraPhoneNumber: String,
  language: Array,
  bloodGroup: String,
  timeZone: String,
  degree: String,
  experience: String,
  membership: String,
  socialId: String,
  college: String,
  yearOfCompletion: String,
  identityFile: Array,
  proffession: String,
  registrationProff: String,
  establishmentProff: String,
  fees: Number,
  establishmentHour: String,
  hours: String,
  treatment: Array,
  practiceSince: String,
  typeOfEstablishment: {
    type: String,
    default: "VisitEstablishment",
  },
  location: {
    address: String,
    landmark: String,
    state: String,
    city: String,
    pincode: Number,
    country: String,
    lat: {
      type: String,
      require: true,
    },
    lng: {
      type: String,
      require: true,
    },
  },
  status: {
    type: String,
    default: "active",
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model("User", User);