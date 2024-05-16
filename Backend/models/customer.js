const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  }
);

module.exports = Customer = mongoose.model("Customer", customerSchema);
