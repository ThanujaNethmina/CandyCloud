const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },

  customerAddress: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  trackingCode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
});

module.exports = Delivery = mongoose.model("Delivery", deliverySchema);
