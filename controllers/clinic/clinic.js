const mongoode = require("mongoose");
const { parseInt } = require("lodash");
var ClinicMember = mongoode.model("ClinicMember");
var MemberLocation = mongoode.model("MemberLocation");

module.exports = {
  getMembers: (id) => {
    return new Promise(function (resolve, reject) {
      ClinicMember.find({ clinicId: id })
        .populate("doctorId")
        .then((resData) => {
          resolve(resData);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },    

  getByDoctor: (id) => {
    console.log("id", id);
    return new Promise(function (resolve, reject) {
      MemberLocation.aggregate([
        {
          $match: {
            doctorId: mongoode.Types.ObjectId(id),
          },
        },
        // {
        //     $lookup: {
        //         from: "clinics",
        //         localField: "clinicId",
        //         foreignField: "_id",
        //         as: "clinicData",
        //     },
        // },
        // {
        //     $unwind: "$clinicData"
        // },
        // {
        //     $lookup: {
        //         from: "users",
        //         localField: "doctorId",
        //         foreignField: "_id",
        //         as: "docData",
        //     },
        // },
        // {
        //     $unwind: "$docData"
        // },
        // {
        //     $lookup: {
        //         from: "locations",
        //         localField: "locationId",
        //         foreignField: "_id",
        //         as: "locData",
        //     },
        // },
        // {
        //     $unwind: "$locData"
        // },
        // {
        //     $group: {
        //         _id: "$doctorId",
        //         docFirstName: { $first: "$docData.firstName" },
        //         docLastName: { $first: "$docData.lastName" },
        //         data: { $push: { "clinic_name": "$clinicData.name", "clinic_location": "$locData.location" } },
        //     }
        // }
      ])
        .then((resUser) => {
          console.log(resUser);
          resolve(resUser);
        })
        .catch((err) => reject(err));
    });
  },
};
