const mongoose = require("mongoose");

const User = mongoose.model("User");
const ChatHead = mongoose.model("ChatHead");
const log = require("../../helper/logger");

module.exports = {
  addHead: (headData) => {
    return new Promise(function (resolve, reject) {
        User.findOne({
          mobileNumber: headData.mobileNumber,
        }).then((payload) => {
          if (payload) {
            headData["receiver"] = payload._id;
            ChatHead.findOne({
              $or: [
                {
                  $and: [
                    {
                      sender: headData.sender,
                    },
                    {
                      receiver: payload._id,
                    },
                  ],
                },
                {
                  $and: [
                    {
                      receiver: headData.sender,
                    },
                    {
                      sender: payload._id,
                    },
                  ],
                },
              ],
            }).then((data) => {
              if (data) {
                resolve(data);
              } else {
                var head = new ChatHead(headData);
                head
                  .save()
                  .then((data) => {
                    resolve(data);
                  })
                  .catch((error) => {
                    log.error("Add head Error :", error);
                    reject(error);
                  });
              }
            });
          }
        });
    });
  },

  getAllOfHead: (userId) => {
    return new Promise(function (resolve, reject) {
      
      ChatHead.aggregate([
        {
          $match: {
            $or: [
              { sender: mongoose.Types.ObjectId(userId) },
              { receiver: mongoose.Types.ObjectId(userId) },
            ],
          },
        },
        {
            $lookup: {
              from: "users",
              localField: "sender",
              foreignField: "_id",
              as: "sender_info",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "receiver",
              foreignField: "_id",
              as: "receiver_info",
            },
          },
        {
          $lookup: {
            from: "chats",
            localField: "_id",
            foreignField: "chatHead",
            as: "chat_info",
          },
        },
        {$unwind: '$chat_info'},
        {$unwind: '$sender_info'},
        {$unwind: '$receiver_info'},
        { $sort: { "chat_info.chatHead": -1 } },

        {
          $group: {
            _id: "$chat_info.chatHead",
            lastMessage: { $last: "$chat_info.message" },
            lastMessageChatTime: { $last: "$chat_info.createdAt" },
            sender_info:{$first: '$sender_info'},
            receiver_info:{$first: '$receiver_info'},
          },
        },
      ])
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
            console.log(err);    
        });
    });
  },
};
