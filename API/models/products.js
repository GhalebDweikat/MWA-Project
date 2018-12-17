const mongoose = require('mongoose');
//Define a schema

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Product', ProductSchema)