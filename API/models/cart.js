const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const CartSchema = new Schema({
    userId: ObjectId,
    products: [ObjectId],
    total: Number,
    checkedOut: Boolean
});

//CartSchema.virtual('userId').get(() => return this._id);

module.exports = mongoose.model('Cart', CartSchema)