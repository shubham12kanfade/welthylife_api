const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const Specialization = mongoose.model("Specialization");
let auth = require("../../helper/auth");
let _ = require("lodash");

router.get("/get/all", (req, res) => {
  crudController
    .getAll(Specialization)
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
    .getBy(Specialization, { _id: req.params.id })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add", (req, res) => {
  crudController
    .add(Specialization, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add/multiple", (req, res) => {
  var obj = [];
  Array.from(req.body.spec).forEach((ele) => {
    obj.push({
      fullName: ele.value,
      shortName: ele.name,
      backImg:
        "http://whealthylife.in:3311/static/1602594943768-187356,xcitefun-shahrukh-khan-ra-1-stills-1.jpg",
    });
  });
  console.log("obj=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", obj);
  crudController
    .insertMultiple(Specialization, obj)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/edit/by/:id", (req, res) => {
  crudController
    .updateBy(Specialization, req.params.id, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
router.put("/increament/count/:id", (req, res) => {
  crudController
    .updateBy(Specialization, req.params.id, { $inc: { searched: 1 } })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/top/counts", (req, res) => {
  crudController
    .getWithSortByLimit(Specialization, {}, { searched: -1 }, 4)
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
    .delete(Specialization, req.params.id)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
