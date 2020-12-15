const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const slotController = require("../../controllers/doctor/slot");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const doctorController = require("../../controllers/doctor/doctor");
const log = require("../../helper/logger");
const Slots = mongoose.model("Slots");
let auth = require("../../helper/auth");
let _ = require("lodash");

router.post("/", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .getOne(Slots, { userId: req.userId })
    .then((resData) => {
      if (resData) {
        crudController
          .updateBy(Slots, resData._id, { ...req.body })
          .then((slotData) => {
            response.successResponse(res, 200, slotData);
          })
          .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
          });
      } else {
        crudController
          .add(Slots, { ...req.body, userId: req.userId })
          .then((slotData) => {
            response.successResponse(res, 200, slotData);
          })
          .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
          });
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
});

router.get("/", auth, (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .getOne(Slots, { userId: req.userId })
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/:id", auth, (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .getSingleRecordByPopulate(Slots, { _id: req.params.id }, "userId")
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/by/:id", (req, res) => {
  log.debug("/api/profile/details");
  slotController
    .getTimeSlots(req.params.id, req.body.date)
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
