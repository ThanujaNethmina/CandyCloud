import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    ItemId: {
        type: Number,
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
    }
}, {
    timestamps: true
});

export default mongoose.model("Product", productSchema);
