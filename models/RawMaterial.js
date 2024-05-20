const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rawMaterialSchema = new Schema({
    item_id: {
        type: String,
        required: true
    },
    RawMaterial_name: {
        type: String,
        required: true
    },
    Quantity: {
        type: String,
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
    } ,
    ROL: {
        type: String,
        required: true
    }
});

const RawMaterial = mongoose.model("RawMaterial", rawMaterialSchema); // Change model name to "RawMaterial"
module.exports = RawMaterial;
