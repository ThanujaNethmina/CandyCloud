const mongoose = require("mongoose");

const Raw_MaterialSchema = new mongoose.Schema({
  ItemId: {
    type: Number,
  },
  product_name: {
    type: String,
    required: true,
  },
  SupplierName: {
    type: String,
  },
  Quantity: {
    type: Number,
  },
  value: {
    type: Number,
  },
  Expired_date: {
    type: Date,
  },
  Manufactured_Date: {
    type: Date,
  },
});

module.exports = Material = mongoose.model("Raw_Materials", Raw_MaterialSchema);
