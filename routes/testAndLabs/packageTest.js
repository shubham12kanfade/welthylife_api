const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const PackageTest = mongoose.model("PackageTest");
const PackageMaster = mongoose.model("PackageMaster");

let auth = require("../../helper/auth");
let _ = require("lodash");

router.post("/add", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .add(PackageTest, req.body)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/all/by/:packageId", (req, res) => {
  log.debug("/api/");
  crudController
    .getbySortByTwoPopulate(
      PackageTest,
      { packageId: req.params.packageId },
      "profileId",
      "testId"
    )
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/:id", auth, (req, res) => {
  crudController
    .updateBy(PackageTest, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .delete(PackageTest, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add/multiple", (req, res) => {
  var obj = [];
  Array.from(req.body.testsAndProfiles).forEach((ele) => {
    obj.push({
      packageId: req.body.packageId,
      testId: ele.testId ? ele.testId : null,
      profileId: ele.profileId ? ele.profileId : null,
    });
  });
  crudController
    .insertMultiple(PackageTest, obj)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, parseInt(error.code));
    });
});

router.post("/search/packageByName", (req, res) => {
  log.debug("/api/");
  var search = req.body.search
  crudController
    .getBy(PackageMaster, { title: {"$regex": search, $options: "i", }})
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
})

module.exports = router;
