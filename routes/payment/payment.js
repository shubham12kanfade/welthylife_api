const router = require('express').Router();
var Razorpay = require('razorpay');
var mongoose = require('mongoose');
var response = require('../../helper/response');
let auth = require("../../helper/auth");
const DoctorsMemberships = mongoose.model("DoctorsMemberships");
var moment = require("moment");
const {
    reject
} = require('lodash');



var instance = new Razorpay({
    key_id: 'rzp_test_WRtvrN6I5Un56X',
    key_secret: 'hcS1KtKuAc6rNXgmgM8nG0ms'
})


var amount = 2000,
    currency = 'INR',
    receipt = '1234545f4',
    payment_capture = true,
    notes = "something",
    order_id,
    payment_id;

// router.post('/get/payment/:type/:userId', (req, res) => {
//     if (req.params.type === 'online') {
//         res.json({ url: 'http://3.13.58.231:3322/payment/pay/' + req.params.userId + '/' + req.body.data });
//     } else {
//         console.log("req.body", req.body)
//         Cart.find({ userId: req.params.userId, status: { $ne: 'deleted' }, orderStatus: 'inCart' })
//             .then(resData => {
//                 Cart.updateMany({ userId: req.params.userId, status: { $ne: 'deleted' } }, { $set: { orderStatus: 'payment' } }).then(resss => {
//                     console.log("resss", resss)
//                     const data = {
//                         cartdata: resData,
//                         userId: req.params.userId,
//                         address: req.body.data,
//                         paymentObject: {},
//                         paymentMode: 'Cash',
//                     }
//                     var buy = new Buy(data);
//                     buy.save().then(resData => {
//                         response.successResponse(res, 200, resData);
//                     }).catch(error => {
//                         console.log("error", error)
//                         response.errorResponse(res, 500)
//                     });
//                 }).catch(error => {
//                     console.log("error", error)
//                     response.errorResponse(res, 500)
//                 })
//             }).catch(error => {
//                 console.log("error", error);
//                 response.errorResponse(res, 500)
//             })
//     }
// });

router.get('/buy/:doctorId/:membershipId/:ammount', (req, res) => {

    var buyMembership = new DoctorsMemberships({
        doctorId: req.params.doctorId,
        membershipId: req.params.membershipId,
        date: moment(),
        expiryDate: "",
        status: "Pending",
    });
    // buyMembership.save().then(resData => {
    instance.orders.create({
        amount: req.params.ammount,
        currency,
        receipt: buyMembership._id,
        payment_capture,
        notes: 'payment for membership'
    }).then((response) => {
        console.log(response);
        order_id = response.id;
    }).catch((error) => {
        console.log(error);
    })
    res.render(
        'index', {
            order_id: order_id,
            amount: req.params.ammount,
            _id: buyMembership._id.toString()
        }
    );
    // }).catch(err => {
    //     console.log("error while saving object", err);
    //     response.errorResponse(res, 500);
    // });
});

router.post('/purchase', (req, res) => {
    payment_id = req.body;

    console.log(payment_id);
    console.log("**********Payment authorized***********", req.body);

    instance.payments.fetch(payment_id.razorpay_payment_id).then((response) => {
        console.log("**********Payment instance***********");
        console.log(response);
        console.log("**********Payment instance***********")
        instance.payments.capture(payment_id.razorpay_payment_id, response.amount).then((response) => {
            console.log("TCL: response", payment_id.id)
            // Buy.findByIdAndUpdate({
            //         _id: payment_id.id
            //     }, {
            //         paymentStatus: 'Success'
            //     }, {
            //         $new: true
            //     })
            //     .then(resData => {
            //         socketIo.emit("paymentStatus", resData);
            //         res.render('success');
            //     }).catch(error => {
            //         socketIo.emit("paymentError", error);
            //         res.render('error');
            //         console.log("error", error)
            //     })
        }).catch((error) => {
            socketIo.emit("paymentError", error);
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
})

router.get('/check/status', (req, res) => {
    buy.find({
        _id: req.params
    }).then(resData => {
        res.send({
            status: 200,
            data: resData
        });
    }).catch(error => {
        res.send({
            status: 0,
            error
        });
    })
})

module.exports = router;