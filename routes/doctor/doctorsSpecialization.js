const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");

const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const Qualification = mongoose.model("Qualification");
let auth = require("../../helper/auth");
let _ = require("lodash");
const users = require("../../models/users");
const DoctorsSpecialization = mongoose.model("DoctorsSpecialization");

router.get("/all", auth, (req, res) => {
  crudController
    .getbySortByPopulate(
      DoctorsSpecialization,
      { doctorId: req.userId },
      "specializationId"
    )
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/specialization/:specializationId", (req, res) => {
  crudController
    .getbySortByPopulate(
      DoctorsSpecialization,
      { specializationId: req.params.specializationId },
      "doctorId"
    )
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

// router.get("/by/specialization/free/consultants", (req, res) => {
//   users.

//     .then((resData) => {
//       response.successResponse(res, 200, resData);
//     })
//     .catch((error) => {
//       log.error(error);
//       response.errorResponse(res, 500);
//     });
// });

router.post("/add", auth, (req, res) => {
  DoctorsSpecialization.deleteMany({ doctorId: req.userId })
    .then((resData) => {
      var obj = [];
      Array.from(req.body.specializationArray).forEach((ele) => {
        obj.push({
          doctorId: req.userId,
          specializationId: ele,
        });
      });
      crudController
        .insertMultiple(DoctorsSpecialization, obj)
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
