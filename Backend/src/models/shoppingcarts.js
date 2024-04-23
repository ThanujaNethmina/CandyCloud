import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    ProductId: {
        type: String,
        required: true
    },
    CustomerID: {
        type: String,
        required: false
    },
    CustomerName: {
        type: String,
        required: false
    },
    ProductName: {
        type: String,
        required: true
    },
    UnitPrice: {
        type: Number,
        required: true
    },
    Qty: {
        type: Number,
        required: true
    },
    TotalPrice: {
        type: Number,
        required: true
    },
    ShippingId:{
        type: String,
        required: false,
        default:null
    }
}, {
    timestamps: true
});

export default mongoose.model("Shoppingcarts", cartSchema);
