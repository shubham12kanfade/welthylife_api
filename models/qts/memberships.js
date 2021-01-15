const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Memberships = new Schema({
  title: String,
  descrioton: String,
  points: Array,
  ammount: String,
  type: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model("Memberships", Memberships);