const mongoose = require("mongoose");
const log = require("../helper/logger");
const { debug } = require("../helper/logger");
const cons = require("consolidate");
const Product = mongoose.model("Product");

module.exports = {
  addProduct: (data) => {
    return new Promise(function (resolve, reject) {
      var product = new Product(data);
      product
        .save()
        .then((resData) => {
          resolve(resData);
        })
        .catch((error) => {
          log.debug("Add catagory error", error);
          reject(error);
        });
    });
  },

  getProduct: (id) => {
    log.debug("getCatagory", id);
    return new Promise(function (resolve, reject) {
        Product.findById({
        _id: id,
      })
        .then((resData) => {
          if (resData) {
            resolve(resData);
          }
        })
        .catch((error) => {
          log.debug("get catagory error : ", error);
          reject(error);
        });
    });
  },

  getAllProducts: () => {
    log.debug("getAllCatagories");
    return new Promise(function (resolve, reject) {
        Product.find({}).then(resData => {
            resolve(resData)
        }).catch(err => {
            reject(err);
        });

    });
  },

  updateCatagory: (id, productData) => {
    return new Promise(function (resolve, reject) {
        Product.findByIdAndUpdate(id, { $set: productData }, { new: true })
        .then((data) => {
          if (data) {
            resolve(data);
          }
        })
        .catch((error) => {
          log.debug("get chat error : ", error);
          reject(error);
        });
    });
  },

  deleteCatagory: (id) => {
    log.debug("id", id);
    return new Promise(function (resolve, reject) {
        Product.findByIdAndDelete(id)
        .then((data) => {
          if (data) {
            resolve(data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  searchProducts: (query) => {
    log.debug("/getUser", query);
    return new Promise(function (resolve, reject) {
      User.find({
        $or: [
          {
            firstName: {
              $regex: query,
            },
          },
          {
            lastName: {
              $regex: query,
            },
          },
        ],
      })
        .then((resData) => {
          log.debug("op => ", resData);
          resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  },

};
