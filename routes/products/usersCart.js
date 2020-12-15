const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const usersCarts = mongoose.model("usersCarts");
const UserAddresses = mongoose.model("UserAddresses");

let auth = require("../../helper/auth");

router.post("/", auth, (req, res) => {
  log.debug("/api/");
  req.body["userId"] = req.userId;
  var temp;
  if (req.body.type == "Test") {
    temp = {
      type: req.body.type,
      testId: req.body.testId,
      userId: req.userId,
      status: "active",
    };
  } else if (req.body.type == "Package") {
    temp = {
      type: req.body.type,
      packageId: req.body.packageId,
      userId: req.userId,
      status: "active",
    };
  } else if (req.body.type == "Profile") {
    temp = {
      type: req.body.type,
      profileId: req.body.profileId,
      userId: req.userId,
      status: "active",
    };
  } else if (req.body.type == "Product") {
    temp = {
      type: req.body.type,
      productId: req.body.productId,
      userId: req.userId,
      status: "active",
    };
  }
  // usersCarts
  //   .find({})
  //   .then((resData) => {
  //     console.log(
  //       "🚀 ~ file: usersCart.js ~ line 22 ~ .then ~ resData",
  //       resData
  //     );
  //     crudController
  //       .updateBy(usersCarts, resData._id, {
  //         $inc: {
  //           quantity: req.body.quantity ? req.body.quantity : 1,
  //           ammount: req.body.ammount,
  //         },
  //         // $inc: {  },
  //       })
  //       .then((resData) => {
  //         response.successResponse(res, 200, resData);
  //       })
  //       .catch((error) => {
  //         log.error(error);
  //         response.errorResponse(res, 500);
  //       });
  //   })
  //   .catch((error) => {
  //     log.error(error);
  //     response.errorResponse(res, 500);
  //   });

  usersCarts
    .findOne(temp)
    .then((resData) => {
      if (resData) {
        console.log(
          "🚀 ~ file: usersCart.js ~ line 22 ~ .then ~ resData",
          resData
        );
        crudController
          .updateBy(usersCarts, resData._id, {
            $inc: {
              quantity: req.body.quantity ? req.body.quantity : 1,
              ammount: req.body.ammount,
            },
            // $inc: {  },
          })
          .then((resData) => {
            response.successResponse(res, 200, resData);
          })
          .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
          });
      } else {
        crudController
          .add(usersCarts, req.body)
          .then((userData) => {
            response.successResponse(res, 200, userData);
          })
          .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
          });
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/change/quantity", auth, (req, res) => {
  log.debug("/api/================", req.body);
  usersCarts
    .findOne({ _id: req.body.id })
    .then((resData) => {
      if (resData && resData.quantity == 1 && req.body.quantity == -1) {
        crudController
          .deletePerm(usersCarts, req.body.id)
          .then((resData) => {
            console.log("userCart Empty");
            response.successResponse(res, 200, resData);
          })
          .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
          });
      } else {
        crudController
          .updateBy(usersCarts, req.body.id, {
            $inc: {
              quantity: req.body.quantity ? req.body.quantity : 1,
              ammount: req.body.ammount,
            },
            // $inc: {  },
          })
          .then((resData) => {
            response.successResponse(res, 200, resData);
          })
          .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
          });
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/", (req, res) => {
  log.debug("/api/");
  crudController
    .getAll(usersCarts)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/userAddresses/:userId", (req, res) => {
  log.debug("/api/");
  crudController
    .getBy(UserAddresses, { userId: req.params.userId })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add/userAddress", auth, (req, res) => {
  log.debug("/api/");
  req.body["userId"] = req.userId;
  crudController
    .add(UserAddresses, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/userId/:userId", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .getbySortByPopulate(usersCarts, { userId: req.userId }, "productId")
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
router.get("/package/userId", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .getbySortByTwoPopulate(
      usersCarts,
      { userId: req.userId, type: "Test", status: { $ne: "deleted" } },
      {
        path: "testId",
        model: "labTests",
        populate: {
          path: "testId",
          model: "TestMaster",
        },
      },
      "labId"
    )
    .then((testData) => {
      crudController
        .getbySortByTwoPopulate(
          usersCarts,
          { userId: req.userId, type: "Profile", status: { $ne: "deleted" } },
          {
            path: "profileId",
            model: "LabProfiles",
            populate: {
              path: "profileId",
              model: "ProfileMaster",
            },
          },
          "labId"
        )
        .then((profileData) => {
          crudController
            .getbySortByTwoPopulate(
              usersCarts,
              {
                userId: req.userId,
                type: "Package",
                status: { $ne: "deleted" },
              },
              {
                path: "packageId",
                model: "LabPackages",
                populate: {
                  path: "packageId",
                  model: "PackageMaster",
                },
              },
              "labId"
            )
            .then((packageData) => {
              response.successResponse(res, 200, {
                tests: testData[0] ? testData : [],
                profiles: profileData[0] ? profileData : [],
                packages: packageData[0] ? packageData : [],
              });
            })
            .catch((error) => {
              log.error(error);
              response.errorResponse(res, 500);
            });
        })
        .catch((error) => {
          log.error(error);
          response.errorResponse(res, 500);
        });
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/:id", (req, res) => {
  log.debug("/api/:id");
  crudController
    .updateBy(usersCarts, req.params.id, req.body)
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
    .deletePerm(usersCarts, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
