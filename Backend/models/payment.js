const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  transitionId: {
    type: String,
  },
  email: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  status: {
    type: String,
  },
  itemName: {
    type: Array,
  },
  purchaseItems: {
    type: Array,
  },
  productItems: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
