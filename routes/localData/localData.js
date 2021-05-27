const router = require("express").Router();
const log = require("../../helper/logger");
const response = require("../../helper/response");
let auth = require("../../helper/auth");
let timeZhone = require("../../helper/jsonData");
let csc = require("country-state-city").default;

router.get("/", (req, res) => {
  response.successResponse(res, 200, csc.getAllCountries());
});

router.get("/country/:countryId", (req, res) => {
  response.successResponse(res, 200, csc.getCountryById(req.params.countryId));
});

router.get("/:id/state", (req, res) => {
  console.log("req.params.id", req.params.id);
  response.successResponse(res, 200, csc.getStatesOfCountry(req.params.id));
});

router.get("/state/:stateId", (req, res) => {
  response.successResponse(res, 200, csc.getStateById(req.params.stateId));
});


router.get("/state/:stateId/city", (req, res) => {
  response.successResponse(res, 200, csc.getCitiesOfState(req.params.stateId));
});

router.get("/city/:cityId", (req, res) => {
  response.successResponse(res, 200, csc.getCityById(req.params.cityId));
});


router.get("/time/zhone", (req, res) => {
  response.successResponse(res, 200, timeZhone.timezones);
});

router.get("/specialisations", (req, res) => {
  response.successResponse(res, 200, timeZhone.specialisations);
});

router.get("/specialisations/four", (req, res) => {
  response.successResponse(res, 200, timeZhone.fourspecialisations);
});

module.exports = router;
