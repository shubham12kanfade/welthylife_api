const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Prefix = new Schema({
  title: String,

  status: {
    type: String,
    default: "active",
  },
});
module.exports = mongoose.model("Prefix", Prefix);
