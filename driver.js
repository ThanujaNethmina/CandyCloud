const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  tel_number: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  
});

module.exports = Driver = mongoose.model("Driver", driverSchema);
