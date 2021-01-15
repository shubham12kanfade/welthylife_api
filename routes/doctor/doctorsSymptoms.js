const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");

const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const DoctorsSymptoms = mongoose.model("DoctorsSymptoms");
let auth = require("../../helper/auth");
let _ = require("lodash");

router.get("/all", auth, (req, res) => {
  crudController
    .getbySortByPopulate(DoctorsSymptoms, { doctorId: req.userId }, "symptomId")
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
      DoctorsSymptoms,
      { doctorId: req.params.id },
      "symptomId"
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
  DoctorsSymptoms.deleteMany({ doctorId: req.userId })
    .then((resData) => {
      var obj = [];

      Array.from(req.body.symptomArray).forEach((ele) => {
        obj.push({
          doctorId: userId,
          symptomId: ele.symptomId,
        });
      });
      console.log("obj=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", obj);
      crudController
        .insertMultiple(DoctorsSymptoms, obj)
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
