const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const doctorController = require("../../controllers/doctor/doctor");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const MemberTimings = mongoose.model("MemberTimings");
const Location = mongoose.model("Location");
const clinicController = require("../../controllers/clinic/clinic");

let auth = require("../../helper/auth");
let _ = require("lodash");

router.get("/by/doctorId/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .getBy(MemberTimings, {
      doctorId: req.params.id
    })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/doctors/timing", auth, (req, res) => {
  var userId
  if (req.body.userId) {
    userId = req.body.userId
  } else {
    userId = req.userId
  }
  req.body["doctorId"] = userId
  log.debug("/api/profile/details");
  crudController
    .add(MemberTimings, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/web/doctors/timing", auth, (req, res) => {
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  // crudController.add()
  // var arr = [];
  // req.body.timingArray.forEach(element => {
  //   arr.push({
  //     doctorId: userId,
  //     clinicId: req.body.clinicId,
  //     locationId: req.body.locationId,
  //     day: element.day,
  //     morningSlot: {
  //       startTime: element.morningSlot.startTime,
  //       endTime: element.morningSlot.endTime,
  //     },
  //     afternoonSlot: {
  //       startTime: element.afternoonSlot.startTime,
  //       endTime: element.afternoonSlot.endTime,
  //     },
  //     eveningSlot: {
  //       startTime: element.eveningSlot.startTime,
  //       endTime: element.eveningSlot.endTime,
  //     },
  //     nightSlot: {
  //       startTime: element.nightSlot.startTime,
  //       endTime: element.nightSlot.endTime,
  //     }
  //   })
  // });
  req.body["userId"] = userId
  crudController
    .add(MemberTimings, req.body)
    .then((slotData) => {
      console.log()
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/by:id", (req, res) => {
  log.debug("/api/");
  crudController
    .updateBy(MemberTimings, {
      _id: req.paramsms.id
    }, req.body)
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

router.get("/clinic/details/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .getRecordByPopulate(MemberTimings, {
      clinicId: req.params.id
    }, ["clinicId", "locationId"])
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;