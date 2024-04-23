import mongoose from 'mongoose';

const { Schema } = mongoose;

const feedbackSchema = new Schema({
    CustomerId: {
        type: String,
        required: true
    },
    ItemID: {
        type: String,
        required: true
    },
    CustomerName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    },
    Feedback: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        default: "" // You can adjust the default value as needed
    }
}, {
    timestamps: true
});

export default mongoose.model("Feedback", feedbackSchema);
