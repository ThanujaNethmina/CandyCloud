const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  CustomerId: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
  },
  Address: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  Email: {
    type: String,
  },
  Gender: {
    type: String,
  },
  Age: {
    type: Number,
  },
});

module.exports = Customer = mongoose.model("Customer", customerSchema);
