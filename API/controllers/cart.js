const cartModel = require('../models/cart');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    getCart: function(req, res, next) {

        cartModel.findOne({userId: req.body.userId, checkedOut: false}, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "Success", message: "Cart Found", data: result});

        });
    },
    addProduct: function(req, res, next) {
        cartModel.findOne({userId: req.body.userId, checkedOut: false}, function (err, cart) {
            cart.products.push(req.param.productId);
            cart.save((err, newCart) => {
                if (err)
                    next(err);
                else
                    res.json({status: "Success", message: "Cart Updated", data: newCart});
            })
        });
    },
    removeProduct: function(req, res, next) {
        cartModel.findOne({userId: req.body.userId, checkedOut: false}, function (err, cart) {
            cart.products.pop(req.param.productId);
            cart.save((err, newCart) => {
                if (err)
                    next(err);
                else
                    res.json({status: "Success", message: "Cart Updated", data: newCart});
            })
        });
    },
    checkout: function(req, res, next) {
        cartModel.findAndUpdate({userId: req.body.userId, checkedOut: false}, {'$set': {checkedOut: true}}, function(err, result){
            if (err)
                next(err);
            else
                res.json({status: "Success", message: "Checked Out!", data: result});
        })
    },
}