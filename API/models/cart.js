const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CartSchema = new Schema({
    userId: ObjectId,
    products: [ObjectId],
    total: Number,
    checkedOut: Boolean
});
module.exports = mongoose.model('Cart', CartSchema)