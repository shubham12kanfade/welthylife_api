const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Product = new Schema(
  {
    catagoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Catagories",
    },
    subCatagoryId: {
      type: mongoose.Types.ObjectId,
      ref: "SubCatagories",
    },
    productDetails: {
      type: String,
      required: true,
    },
    additionalDetails: {
      type: String,
    },
    listPrice: {
      type: String,
    },
    yourPrice: {
      type: String,
    },
    weight: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    minimumQuantity: Number,
    minimumOrderAmmount: String,
    productName: String,
    productBrand: String,
    mainProductImage: String,
    additionalProductImage: [],
    isFeatureProduct: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
      default: "No",
    },
    isVisible: {
      type: String,
      enum: ["Active", "Inactive"],
    },
    location: {
      address: {
        type: String,
        require: true,
      },
      lat: {
        type: String,
        require: true,
      },
      lang: {
        type: String,
        require: true,
      },
    },
    attachment: {
      type: String,
    },
    isApprove: {
      type: String,
      enum: ["Approved", "InApprove"],
      default: "InApprove",
    },
    isApprove: {
      type: Number,
      default: 0,
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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
module.exports = mongoose.model("Product", Product);
