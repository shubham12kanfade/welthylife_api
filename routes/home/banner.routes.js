const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const Banner = mongoose.model("Banner");
const log = require("../../helper/logger");

router.get("/all", (req, res) => {
    log.debug("/api/");
    crudController
      .getAll(Banner)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  module.exports = router;