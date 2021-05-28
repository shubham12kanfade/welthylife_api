const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const ProfileTests = mongoose.model("ProfileTests");
const ProfileMaster = mongoose.model("ProfileMaster");

let auth = require("../../helper/auth");
let _ = require("lodash");

router.post("/add", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .add(ProfileTests, req.body)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/all/by/:profileId", (req, res) => {
  log.debug("/api/");
  crudController
    .getbySortByPopulate(
      ProfileTests, {
        profileId: req.params.profileId
      }, {
        path: "tests",
        match: {
          status: "active"
        },
      }
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
    .updateBy(ProfileTests, req.params.id, req.body)
    .then((userData) => {
      delete userData.otp;
      delete userData.password;
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
    .delete(ProfileTests, req.params.id)
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
  Array.from(req.body.testsArray).forEach((ele) => {
    obj.push({
      profileId: ele.profileId,
      testId: ele.testId,
    });
  });
  crudController
    .insertMultiple(ProfileTests, obj)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, parseInt(error.code));
    });
});

router.post("/search/profileByName", (req, res) => {
  log.debug("/api/");
  var search = req.body.search
  crudController
    .getBy(ProfileMaster, { title: {"$regex": search, $options: "i", }})
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
})

module.exports = router;
