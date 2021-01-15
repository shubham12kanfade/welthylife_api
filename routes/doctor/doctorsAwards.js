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
    .getbySortByPopulate(DoctorsAwards, { userId: req.userId }, "awardId")
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
    .getbySortByPopulate(DoctorsAwards, { userId: req.params.id }, "awardId")
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add", auth, (req, res) => {
  var obj = [];
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  Array.from(req.body.awardArray).forEach((ele) => {
    obj.push({
      userId: userId,
      awardId: ele.awardId,
      year: ele.year,
    });
  });
  crudController
    .insertMultiple(DoctorsAwards, obj)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, parseInt(error.code));
    });
});
module.exports = router;
