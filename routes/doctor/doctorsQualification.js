const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");

const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const Qualification = mongoose.model("Qualification");
const DoctorsQualification = mongoose.model("DoctorsQualification");
let auth = require("../../helper/auth");
let _ = require("lodash");

router.get("/all", auth, (req, res) => {
  crudController
    .getbySortByPopulate(
      DoctorsQualification,
      { doctorId: req.userId },
      "qualificationId"
    )
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/:id", auth, (req, res) => {
  crudController
    .getbySortByPopulate(
      DoctorsQualification,
      { doctorId: req.params.id },
      "qualificationId"
    )
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add", auth, (req, res) => {
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  DoctorsQualification.deleteMany({ doctorId: req.userId })
    .then((resData) => {
      var obj = [];

      Array.from(req.body.qualificationArray).forEach((ele) => {
        obj.push({
          doctorId: userId,
          qualificationId: ele.qualificationId,
          degree: ele.degree,
          completionYear: ele.completionYear,
          college: ele.college,
        });
      });
      console.log("obj=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", obj);
      crudController
        .insertMultiple(DoctorsQualification, obj)
        .then((resData) => {
          response.successResponse(res, 200, resData);
        })
        .catch((error) => {
          log.error(error.code);
          response.errorResponse(res, parseInt(error.code));
        });
    })
    .catch((err) => {
      log.error(err.code);
      response.errorResponse(res, 500);
    });
});
module.exports = router;
