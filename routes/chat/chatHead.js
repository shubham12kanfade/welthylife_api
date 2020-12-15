const router = require("express").Router();
const log = require("../../helper/logger");
let auth = require("../../helper/auth");

const chatHeadController = require("../../controllers/chat/chatHead");
const response = require("../../helper/response");

router.post("/addHeads", (req, res) => {
  log.debug("/api/chathead/addHeads");
  chatHeadController
    .addHead(req.body)
    .then((headData) => {
      const data = {
        _id: headData._id,
        sender: headData.sender,
        receiver: headData.receiver,
        chatHead: headData.chatHead,
        status: headData.status,
      };
      console.log(data);
      response.successResponse(res, 200, data);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, 500);
    });
});

// router.post("/getHeads", auth, (req, res) => {
//   log.debug("/api/chathead/getHead");
//   chatHeadController
//     .getAllOfHead(req.body)
//     .then((headData) => {
//       const data = {
//         _id: headData._id,
//         sender: headData.sender,
//         receiver: headData.receiver,
//         chatHead: headData.chatHead,
//         status: headData.status,
//         isGroup: headData.isGroup,
//         groupId: headData.groupId,
//       };
//       console.log(data);
//       response.successResponse(res, 200, data);
//     })
//     .catch((error) => {
//       response.errorResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
//     });
// });

router.post("/all", (req, res) => {
  log.debug("/api/chathead/all", req.body);

  chatHeadController
    .getAllOfHead(req.body.findId)
    .then((headData) => {
      response.successResponse(res, 200, headData);
    })
    .catch((error) => {
      log.error(error.code);
      response.errorResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

module.exports = router;
