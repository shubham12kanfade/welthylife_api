const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const slotController = require("../../controllers/doctor/slot");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const Appoinment = mongoose.model("Appoinment");
const Appoinments = require("../../models/doctor/appoinments")
const appoinmentController = require("../../controllers/doctor/appoinment");
let auth = require("../../helper/auth");
let _ = require("lodash");

router.post("/add", auth, (req, res) => {
  req.body["petient"] = req.userId
  log.debug("/api/");
  appoinmentController
    .add(req.body)
    .then((resData) => {
      var log = {
        userId: req.userId,
        doctorId: resData.doctor._id,
        logMessage: "prtient clicked on book appoinment",
        logObject: req.body,
      };
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorResponse(res, 500);
    });
});

router.post("/get/by/id", (req, res) => {
  log.debug("/api/profile/details");
  var object = {};
  if (req.body.hasOwnProperty("petientId")) {
    object["petient"] = req.body.petientId;
  } else if (req.body.hasOwnProperty("doctorId")) {
    object["doctor"] = req.body.doctorId;
  } else if (req.body.hasOwnProperty("appoinmentId")) {
    object["_id"] = req.body.appoinmentId;
  }
  appoinmentController
    .getById(object)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/by/time", auth, (req, res) => {
  log.debug("/api/get/by/time========================");
  var object = {};
  appoinmentController
    .getByTime(req.userId)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/remind/appoinment", (req, res) => {
  log.debug("/api/get/by/time========================");
  var object = {};
  appoinmentController
    .remindAppoinment()
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/all", (req, res) => {
  log.debug("/api/profile/details");
  appoinmentController
    .getAll()
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/by/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .updateBy(Appoinment, req.params.id, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/by/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .delete(Appoinment, req.params.id)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/money/:doctorId", (req, res) => {
  log.debug("/api/profile/details");
  Appoinment.aggregate([{
        $match: {
          $and: [{
              doctor: mongoose.Types.ObjectId(req.params.doctorId)
            },
            {
              isPaymentDone: true
            },
          ],
        },
      },
      {
        $group: {
          _id: "$doctor",
          monthly: {
            $first: "$ammount"
          },
          totalAmmount: {
            $sum: "$ammount",
          },
        },
      },
    ])
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.get("/by/:id", (req, res) => {
  log.debug("/api/appoiment/");
  crudController
    .getRecordByPopulates(Appoinment, {
      _id: req.params.id
    }, "petient")
    .then((resData) => {
      console.log("==>>", resData)
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
module.exports = router;