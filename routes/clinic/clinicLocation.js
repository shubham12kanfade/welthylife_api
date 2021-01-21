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
    .getBy(Location, {
      clinicId: req.params.clinicId
    })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/", (req, res) => {
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

router.post("/add", (req, res) => {
  crudController
    .add(Location, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add/web/location", auth ,(req, res) => {
  req.body["clinicId"] = req.userId
  crudController
    .add(Location, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .getOne(Location, {
      _id: req.params.id
    })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/by/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .updateBy(Location, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/by/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .delete(Location, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, "deleted");
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getAll", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .getAll(Location)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
router.get("/by/clinicId/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .getBy(Location, {
      clinicId: req.params.id
    })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


module.exports = router;