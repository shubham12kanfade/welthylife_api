const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const PackageMaster = mongoose.model("PackageMaster");
const PackageTest = mongoose.model("PackageTest");
const LabPackages = mongoose.model("LabPackages");

let auth = require("../../helper/auth");
let _ = require("lodash");

router.post("/master/add", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .add(PackageMaster, req.body)
    .then((testData) => {
      var obj = [];
      req.body.profileArray.forEach((element) => {
        obj.push({ packageId: testData._id, profileId: element });
      });
      crudController
        .insertMultiple(PackageTest, obj)
        .then((resData) => {
          console.log("tests added for profile");
        })
        .catch((err) => {
          log.error(error);
          response.errorResponse(res, 500);
        });
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/all/master", (req, res) => {
  log.debug("/api/");
  crudController
    .getAll(PackageMaster)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/master/by/:id", auth, (req, res) => {
  crudController
    .updateBy(PackageMaster, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/master/by/packageId/:id", (req, res) => {
  log.debug("/api/sssssss");
  crudController
    .getSingleRecordByPopulate(PackageMaster, { _id: req.params.id }, "labId")
    .then((resPkg) => {
      PackageTest.aggregate([
        {
          $match: {
            packageId: mongoose.Types.ObjectId(req.params.id),
            status: "active",
          },
        },
        {
          $lookup: {
            from: "profilemasters",
            // localField: "profileId",
            // foreignField: "_id",
            let: { id: "$profileId" },
            as: "packageProfiles",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$_id", "$$id"] },
                      { $eq: ["$status", "active"] },
                    ],
                  },
                },
              },
            ],
          },
        },
        { $unwind: "$packageProfiles" },
        {
          $lookup: {
            from: "profiletests",
            // localField: "profileId",
            // foreignField: "profileId",
            let: { profid: "$profileId" },
            as: "profileTestsIds",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$profileId", "$$profid"] },
                      { $eq: ["$status", "active"] },
                    ],
                  },
                },
              },
            ],
          },
        },
        { $unwind: "$profileTestsIds" },
        {
          $lookup: {
            from: "testmasters",
            // localField: "_id",
            // foreignField: "profileId",
            let: { testId: "$profileTestsIds.testId" },
            as: "profileTests",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$_id", "$$testId"] },
                      { $eq: ["$status", "active"] },
                    ],
                  },
                },
              },
            ],
          },
        },
        { $unwind: "$profileTests" },
        {
          $group: {
            _id: "$profileId",
            icon: { $first: "$packageProfiles.icon" },
            title: { $first: "$packageProfiles.title" },
            CTA: { $first: "$packageProfiles.CTA" },
            description: { $first: "$packageProfiles.details" },
            precaution: { $first: "$packageProfiles.precautions" },
            duration: { $first: "$packageProfiles.duration" },
            profileTests: {
              $push: {
                _id: "$profileTests._id",
                icon: "$profileTests.icon",
                title: "$profileTests.title",
                duration: "$profileTests.duration",
                details: "$profileTests.details",
                precautions: "$profileTests.precautions",
              },
            },
          },
        },
      ])
        .then((testData) => {
          var obj = {
            package: resPkg,
            packageProfiles: testData,
          };
          response.successResponse(res, 200, obj);
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

router.post("/remove/profile/from/:packageId", (req, res) => {
  log.debug("/api/");
  crudController
    .deleteMulti(PackageTest, {
      $and: [
        { packageId: req.params.packageId },
        { profileId: { $in: req.body.profileArray } },
      ],
    })
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add/profile/to/:packageId", (req, res) => {
  log.debug("/api/");
  var obj = [];
  req.body.profileArray.forEach((element) => {
    obj.push({ packageId: req.params.packageId, profileId: element });
  });
  crudController
    .insertMultiple(PackageTest, obj)
    .then((resData) => {
      console.log("tests added for profile");
      response.successResponse(res, 200, resData);
    })
    .catch((err) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/master/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .delete(PackageMaster, req.params.id)
    .then((userData) => {
      crudController
        .deleteMulti(PackageTest, { packageId: req.params.id })
        .then((resData) => {
          console.log("delete multi++++", resData);
        })
        .catch((err) => {
          console.log(err);
        });
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/packagemaster/:id", (req,res) => {
crudController
.deletePerm(PackageMaster, req.params.id)
.then((resData) => {
  response.successResponse(res, 200, resData);
})
.catch((error) => {
  log.error(error);
      response.errorResponse(res, 500);
});
})

router.post("/add/multiple", auth, (req, res) => {
  var obj = [];
  Array.from(req.body.packagesArray).forEach((ele) => {
    obj.push({
      labId: req.userId,
      name: ele.name,
      discription: ele.discription,
    });
  });
  crudController
    .insertMultiple(PackageMaster, obj)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, parseInt(error.code));
    });
});

router.get("/by/labId/:id", (req, res) => {
  log.debug("/api/profile/by/labid");
  crudController
    .getbySortByTwoPopulate(
      LabPackages,
      { labId: req.params.id, status: "active" },
      "packageId",
      "centerId"
    )
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add/for/lab", (req, res) => {
  log.debug("/api/");
  crudController
    .add(LabPackages, req.body)
    .then((resPkg) => {
      response.successResponse(res, 200, resPkg);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/labPackage/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .delete(LabPackages, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/labPackage/:id", auth, (req, res) => {
  crudController
    .updateBy(LabPackages, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/admin/by/labPackageId/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .getbySortByTwoPopulate(
      LabPackages,
      { _id: req.params.id },
      "packageId",
      "centerId"
    )
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
router.get("/by/labId/:id", (req, res) => {
  log.debug("/api/profile/by/labid");
  crudController
    .getbySortByTwoPopulate(
      LabPackages,
      { labId: req.params.id, status: "active" },
      {
        path: "packageId",
        model: "PackageMaster",
        // select: {
        //   _id: 1,
        //   mrp: 1,
        //   discountOffer: 1,
        //   description: 1,
        //   city: 1,
        //   PPL: 1,
        //   centerId: 1,
        // },
        // populate: {
        //   path: "profileId",
        //   model: "ProfileMaster",
        // },
      },
      "centerId"
    )
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/labPackage/:id", (req, res) => {
  log.debug("/api/");
  LabPackages.aggregate([
    {
      $match: {
        _id: req.params.id,
        status: "active",
      },
    },
    {
      $lookup: {
        from: "labcenters",
        let: { centerId: "$centerId" },
        as: "center",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$centerId"] },
                  { $eq: ["$status", "active"] },
                ],
              },
            },
          },
        ],
      },
    },
    { $unwind: "$center" },
    {
      $lookup: {
        from: "labs",
        let: { labId: "$labId" },
        as: "lab",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$labId"] },
                  { $eq: ["$status", "active"] },
                ],
              },
            },
          },
        ],
      },
    },
    { $unwind: "$lab" },
    {
      $lookup: {
        from: "packagemasters",
        let: { packageId: "$packageId" },
        as: "package",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$packageId"] },
                  { $eq: ["$status", "active"] },
                ],
              },
            },
          },
        ],
      },
    },
    { $unwind: "$package" },
    {
      $lookup: {
        from: "packagetests",
        let: { packageId: "$package._id" },
        as: "profileData",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$packageId", "$$packageId"] },
                  { $eq: ["$status", "active"] },
                ],
              },
            },
          },
        ],
      },
    },
    { $unwind: "$profileData" },
    {
      $lookup: {
        from: "profilemasters",
        let: { profileId: "$profileData.profileId" },
        as: "profile",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$profileId"] },
                  { $eq: ["$status", "active"] },
                ],
              },
            },
          },
        ],
      },
    },
    { $unwind: "$profile" },

    {
      $lookup: {
        from: "profiletests",
        let: { profileId: "$profile._id" },
        as: "testData",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$profileId", "$$profileId"] },
                  { $eq: ["$status", "active"] },
                ],
              },
            },
          },
        ],
      },
    },
    { $unwind: "$testData" },
    {
      $lookup: {
        from: "testmasters",
        let: { testId: "$testData.testId" },
        as: "tests",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$testId"] },
                  { $eq: ["$status", "active"] },
                ],
              },
            },
          },
        ],
      },
    },
    { $unwind: "$tests" },
    {
      $group: {
        _id: "$_id",
        mrp: "$mrp",
        discountOffer: "$discountOffer",
        PPL: "$PPL",
        icon: "$profile.icon",
        title: "$profile.title",
        description: "$profile.description",
        precaution: "$profile.precaution",
        lab: {
          icon: "$lab.icon",
          name: "$lab.name",
          email: "$lab.email",
          doc1: "$lab.doc1",
          mobileNumber: "$lab.mobileNumber",
          altMobileNumber: "$lab.altMobileNumber",
          type: "$lab.type",
          regCertNo: "$lab.regCertNo",
          about: "$lab.about",
        },
        center: {
          icon: "$center.icon",
          name: "$center.name",
          email: "$center.email",
          fax: "$center.fax",
          mobileNumber: "$center.mobileNumber",
          type: "$center.type",
          details: "$center.details",
          address: "$center.address",
          landmark: "$center.landmark",
          state: "$center.state",
          city: "$center.city",
          pincode: "$center.pincode",
          country: "$center.country",
        },
        profiles: {
          $push: {
            _id: "$profileData.profileId",
            CTA: "$profile.CTA",
            icon: "$profile.icon",
            title: "$profile.title",
            duration: "$profile.duration",
            details: "$profile.details",
            precautions: "$profile.precautions",
            tests: {
              $push: {
                _id: "$testData.testId",
                CTA: "$test.CTA",
                icon: "$test.icon",
                title: "$test.title",
                duration: "$test.duration",
                details: "$test.details",
                precautions: "$test.precautions",
              },
            },
          },
        },
      },
    },
  ])
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
module.exports = router;
