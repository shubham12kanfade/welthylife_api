const mongoode = require("mongoose");
const { parseInt } = require("lodash");
var ProductCatagories = mongoode.model("ProductCatagories");

module.exports = {
  getcatData: () => {
    return new Promise(function (resolve, reject) {
      ProductCatagories.aggregate([
        {
          $lookup: {
            from: "productsubcatagories",
            localField: "_id",
            foreignField: "catagoryId",
            as: "subCatData",
          },
        },
        {
          $unwind: "$subCatData",
        },
        {
          $group: {
            _id: "$_id",
            catagoryName: { $first: "$name" },
            SubCatagories: {
              $push: {
                catagoryName: "$subCatData.name",
                catagoryId: "$subCatData._id",
              },
            },
          },
        },
      ])
        .then((resUser) => {
          console.log("===================>", resUser);
          resolve(resUser);
        })
        .catch((err) => reject(err));
    });
  },
};
