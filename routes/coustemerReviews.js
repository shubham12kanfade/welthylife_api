const router = require("express").Router();
const crudController = require("../controllers/commonController/crudController");
const response = require("../helper/response");
const mongoose = require("mongoose");
const log = require("../helper/logger");
const CustomerReviews = mongoose.model("CustomerReviews");
const reviewFeedbacks = mongoose.model("reviewFeedbacks");
let auth = require("../helper/auth");
let _ = require("lodash");

router.get("/get/all/best", (req, res) => {
  crudController
    .getbySortByPopulate(
      CustomerReviews,
      { stars: { $gte: 4 }, reviewType: "HappyCustomers" },
      "userId"
    )
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/by/type/:type", (req, res) => {
  crudController
    .getbySortByPopulateField(
      CustomerReviews,
      { stars: { $gte: 4 }, reviewType: req.params.type },
      "userId",
      ["firstName", "lastName", "proffession"]
    )
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/by/:id", (req, res) => {
  crudController
    .getBy(CustomerReviews, { _id: req.params.id })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/by/doctor/:id", (req, res) => {
  crudController
    .getbySortByTwoPopulate(
      CustomerReviews,
      { doctorId: req.params.id, reviewType: "Doctor" },
      "userId",
      "feedbackId"
    )
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/by/lab/:id", (req, res) => {
  crudController
    .getbySortByTwoPopulate(
      CustomerReviews,
      { doctorId: req.params.id, reviewType: "Labs" },
      "userId"
    )
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add", auth, (req, res) => {
  req.body["userId"] = req.userId;
  crudController
    .add(CustomerReviews, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, parseInt(error.code));
    });
});

router.post("/feedback/add", auth, (req, res) => {
  req.body["userId"] = req.userId;
  crudController
    .add(reviewFeedbacks, req.body)
    .then((resData) => {
      crudController
        .updateBy(CustomerReviews, req.body.reviewId, {
          feedbackId: resData._id,
        })
        .then((upData) => {
          console.log("rewiew Updated", upData);
        })
        .catch((error) => {
          log.error(error);
        });
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, parseInt(error.code));
    });
});

router.put("/edit/by/:id", (req, res) => {
  crudController
    .updateBy(CustomerReviews, req.params.id, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/by/:id", (req, res) => {
  crudController
    .delete(CustomerReviews, req.params.id)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
