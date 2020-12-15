const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ProductCatagories = new Schema(
  {
    name: String,
    description: String,
    icon: String,
    type: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ProductCatagories", ProductCatagories);
