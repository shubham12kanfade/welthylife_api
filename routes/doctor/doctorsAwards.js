const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");

const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const Qualification = mongoose.model("Qualification");
const DoctorsAwards = mongoose.model("DoctorsAwards");
let auth = require("../../helper/auth");
let _ = require("lodash");

router.get("/all", auth, (req, res) => {
  crudController
    .getbySortByPopulate(DoctorsAwards, { doctorId: req.userId }, "awardId")
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/:id", auth, (req, res) => {
  console.log("/by/:id==========+++++++++++++");

  crudController
    .getbySortByPopulate(DoctorsAwards, { doctorId: req.params.id }, "awardId")
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add", auth, (req, res) => {
  //   var obj = [];

  //   Array.from(req.body.qualificationArray).forEach((ele) => {
  //     obj.push({
  //       doctorId: req.userId,
  //       qualificationId: ele.qualificationId,
  //       degree: ele.degree,
  //       completionYear: ele.completionYear,
  //       college: ele.college,
  //     });
  //   });
  //   console.log("obj=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", obj);
  crudController
    .add(DoctorsAwards, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, parseInt(error.code));
    });
});
module.exports = router;
