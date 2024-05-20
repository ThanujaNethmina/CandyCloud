const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    item_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    Expired_date: {
        type: Date,
        required: true
    },
    Manufactured_Date: {
        type: Date,
        required: true
    },
    ROL: {
        type: String,
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
