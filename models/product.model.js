const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    },

    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;