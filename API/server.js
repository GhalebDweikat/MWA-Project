const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const products = require('./routes/products');
const cart = require('./routes/cart');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');

const app = express();

app.use(cors());

app.set('secretKey', 'Qs@FAln%cASDfsfsdF@#'); // jwt secret token

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', function(req, res){
    res.json({"API" : "Online"});
});


app.use('/users', users);

app.use('/products', validateUser, products);
app.use('/cart', validateUser, cart);

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) {
            res.json({status:"error", message: err.message, data:null});
        }else{
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });

}

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    console.log(err);

    if(err.status === 404)
        res.status(404).json({message: "Resource Not Found"});
    else
        res.status(500).json({message: "Internal Server Error!"});
});

app.listen(3000, function(){
    console.log('Node server listening on port 3000');
});