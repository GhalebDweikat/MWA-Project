const productsModel = require('../models/products');

module.exports = {
    getByName: function(req, res, next) {
        console.log(req.body);
        productsModel.find({name: "^" + req.params.name}, function(err, productInfo){
            if (err) {
                next(err);
            } else {
                res.json({status:"Found", data:{products: productInfo}});
            }
        });
    },
    getAll: function(req, res, next) {
        //let productsList = [];
        productsModel.find({}, function(err, products){
            if (err){
                next(err);
            } else{

                res.json({status:"Success", data:{products: products}});

            }
        });
    },
    updateById: function(req, res, next) {
        productsModel.findByIdAndUpdate(req.params.productId,{"$set" : {name:req.body.name}}, function(err, productInfo){
            if(err)
                next(err);
            else {
                res.json({status:"Success", message: "Product updated successfully!!!", data:null});
            }
        });
    },
    deleteById: function(req, res, next) {
        productsModel.findByIdAndRemove(req.params.productId, function(err, movieInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Product deleted successfully!!!", data:null});
            }
        });
    },
    create: function(req, res, next) {
        productsModel.create({ name: req.body.name, price: req.body.price, description: req.body.description }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "Product added successfully!!!", data: result});

        });
    },
}