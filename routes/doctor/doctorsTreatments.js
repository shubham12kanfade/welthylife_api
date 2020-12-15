const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");

const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const Qualification = mongoose.model("Qualification");
let auth = require("../../helper/auth");
let _ = require("lodash");
const DoctorsTreatments = mongoose.model("DoctorsTreatments");

router.get("/all", auth, (req, res) => {
  crudController
    .getbySortByPopulate(
      DoctorsTreatments,
      { doctorId: req.userId },
      "treatmentId"
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
  DoctorsTreatments.deleteMany({ doctorId: req.body.userId })
    .then((resData) => {
      var obj = [];
      Array.from(req.body.treatmentArray).forEach((ele) => {
        obj.push({
          doctorId: req.userId,
          treatmentId: ele,
        });
      });
      crudController
        .insertMultiple(DoctorsTreatments, obj)
        .then((resData) => {
          response.successResponse(res, 200, resData);
        })
        .catch((error) => {
          log.error(error.code);
          response.errorResponse(res, parseInt(error.code));
        });
    })
    .catch((err) => {
      log.error(error.code);
      response.errorResponse(res, parseInt(error.code));
    });
});

module.exports = router;
