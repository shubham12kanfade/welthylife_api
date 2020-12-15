const mongoose = require('mongoose');
const log = require('../helper/logger');
const jwt = require('jsonwebtoken');
let config = require('./../config.json');
const User = mongoose.model('User');

module.exports = (io) => {

    // io.use((socket, next) => {
    //     let token = socket.handshake.query.token;
    //     // token = token.split('JWT ')[1];
    //     // jwt.verify(token, config.secretKey, (err, decoded) => {
    //     //     if (err) {
    //     //         console.log(err.message)
    //     //         return next(err)
    //     //     };
    //         // socket.id = decoded._id;
    //         // next();
    //     // });
    // });

    io.on('connection', (socket) => {
        console.log("+++++++++++++++");
        socket.on("rideRequest", (data) => {
            console.log("rideRequest", data, data.vehicleType._id)
        });

        socket.on('rideAccepted', (dada) => {
            console.log("TCL: dada", dada)
            io.emit('rideAcceptedAll', 'close');
        })


        socket.on('rideCancel', (dada) => {
            console.log("TCL: dada", dada)
        })

        socket.on("rideResponse", (data) => {
            log.debug('rideResponse');
        });

        socket.on("otpConfirmed", (data) => {})

        socket.on("liveLocation", (data) => {
            log.debug('liveLocation');
            console.log(data)

            io.to(data.user._id).emit("driverLocation", data);
        });

        socket.on("rideFare", (data) => {
            log.debug('rideFare');
            console.log(data)
            io.to(data.user._id).emit("rideFare", data);
            io.to(data.driver._id).emit("rideEnded", data);
        });

        socket.on("paymentComplete", (data) => {
            log.debug('paymentComplete');
            console.log(data)
            io.to(data.user._id).emit("paymentComplete", {
                paymentStatus: "Success"
            });
            // io.to(data.driver._id).emit("rideEnded", data);
        });


        socket.on("rideacceptedbyadmin", (data) => {
            console.log("rideacceptedbyadmin", data);
            io.to(data).emit("reloadPage", data)
        });
    });


}