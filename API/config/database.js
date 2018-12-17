
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/OnlineStore';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;
