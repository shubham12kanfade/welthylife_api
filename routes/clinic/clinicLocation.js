const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const MemberLocation = mongoose.model("MemberLocation");
const Location = mongoose.model("Location");
const clinicController = require("../../controllers/clinic/clinic");

let auth = require("../../helper/auth");
let _ = require("lodash");

router.get("/by/clinicId/:clinicId", (req, res) => {
  log.debug("/api/");
  crudController
    .getBy(Location, { clinicId: req.params.clinicId })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/doctors/location", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .add(MemberLocation, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/", (req, res) => {
  log.debug("/api/profile/details===================>", req.body.location);
  var obj = [];

  Array.from(req.body.location).forEach((ele) => {
    obj.push({
      clinicId: req.body.clinicId,
      location: ele,
    });
  });
  console.log("obj=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", obj);
  crudController
    .insertMultiple(Location, obj)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/by:id", (req, res) => {
  log.debug("/api/");
  crudController
    .updateBy(ClinicLocation, { _id: req.paramsms.id }, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/delete/by/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .delete(ClinicLocation, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
