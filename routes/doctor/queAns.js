const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const Questions = mongoose.model("Questions");
const Answers = mongoose.model("Answers");

let auth = require("../../helper/auth");
let _ = require("lodash");

router.post("/add/question", auth, (req, res) => {
  log.debug("/api/");
  req.body["patientId"] = req.userId;
  crudController
    .add(Questions, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorResponse(res, 500);
    });
});

router.post("/add/answer", auth, (req, res) => {
  log.debug("/api/");
  req.body["doctorId"] = req.userId;
  crudController
    .add(Answers, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/answer/by/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .updateBy(Answers, req.params.id, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
router.put("/update/question/by/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .updateBy(Answers, req.params.id, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/question/by/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .delete(Questions, req.params.id)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
router.delete("/answer/by/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .delete(Answers, req.params.id)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/questions", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .getAll(Questions)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/doctor/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .getbySortByPopulate(Answers, { doctorId: req.params.id }, "questionId")
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
