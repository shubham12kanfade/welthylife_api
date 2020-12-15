const mongoose = require("mongoose");
const Chat = mongoose.model("Chat");
const User = mongoose.model("User");
let log = require('../../helper/logger');
const ERRORS = require('../../helper/errorMessages');
const { USER_ALREADY_REGISTERED } = require("../../helper/errorMessages");
var fbadmin = require("firebase-admin");



module.exports = {
    putChat: (chatData, tokenData) => {
        log.debug("putChat", chatData);
        return new Promise(function(resolve, reject) {
            var chat = new Chat(chatData);
            chat
                .save()
                .then((data) => {
                    resolve(data);
                    let token = String;
                    User.findOne({ _id: chatData.sender }, { lastName: 1, designation: 1 }).then(doc => {
                        var name = String;
                        if (doc.designation === "Doctor") {
                            name = "Dr. " + doc.lastName;
                        } else {
                            name = lastName;
                        }
                        var data = {
                            title: name,
                            message: chatData.message,
                        }
                        if (tokenData.platform === "Smartphone") {
                            token = tokenData.deviceToken;
                            const deviceToken = token;
                            const message = {
                                notification: {
                                    title: name,
                                    body: chatData.message,
                                },
                            };
                            const options = { priority: "high" };
                            fbadmin
                                .messaging()
                                .sendToDevice(deviceToken, message, options)
                                .then((response) => {
                                    console.log("response from FireBase : ", response);
                                });
                        } else {
                            var data = {
                                title: name,
                                message: chatData.message,
                            }
                            global.socketIo.to(chatData.receiver).emit("WealthyLife", data);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getChat: (id) => {
        log.debug("getChat", id);
        return new Promise(function(resolve, reject) {
            Chat.find({
                    chatHead: id,
                })
                .sort({ _id: -1 })
                .limit(20)
                .then((data) => {
                    if (data) {
                        resolve(data.reverse());
                    }
                })
                .catch((error) => {
                    log.debug("get chat error : ", error);
                    reject({ code: 500 });
                });
        });
    },
};