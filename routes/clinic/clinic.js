const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const clinicController = require("../../controllers/clinic/clinic");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Clinic = mongoose.model("Clinic");

let auth = require("../../helper/auth");
let _ = require("lodash");

router.post("/", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .add(Clinic, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/by:id", (req, res) => {
  log.debug("/api/");
  crudController
    .updateBy(Clinic, { _id: req.paramsms.id }, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .getBy(Clinic, { addedBy: req.params.id })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/all", (req, res) => {
  log.debug("/api/");
  crudController
    .getAll(Clinic)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/doctor/:doctorId", (req, res) => {
  log.debug("/api/asdfghjkl", req.params.doctorId);
  clinicController
    .getByDoctor(req.params.doctorId)
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
    .delete(Clinic, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
