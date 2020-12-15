const router = require("express").Router();
const mongoose = require("mongoose");

const log = require("../../helper/logger");
var fbadmin = require("firebase-admin");
const Token = mongoose.model("Token");

const chatController = require("../../controllers/chat/chat");
const response = require("../../helper/response");

router.post("/addChat", (req, res) => {
  log.debug("api/chat/addChat");
    Token.findOne({ userId: req.body.receiver }).then((tokenData) => {
      log.debug("/api/chat/addchatDetails");
      chatController
        .putChat(req.body, tokenData)
        .then((chatData) => {
          response.successResponse(res, 200, chatData);
        })
        .catch((error) => {
          log.error(error.code);
          response.errorResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
    });
});

router.get("/fetchChat/:id", (req, res) => {
  log.debug("api/chat/getChat");
  chatController
    .getChat(req.params.id)
    .then((chatData) => {
      response.successResponse(res, 200, chatData);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

module.exports = router;
