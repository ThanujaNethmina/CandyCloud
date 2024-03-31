const mongoose = require("mongoose");

const OrderDetailSchema = new mongoose.Schema({
  OrderID: {
    type: String,
    required: true,
  },
  SupplierName: {
    type: String,
  },
  SupplyingItem: {
    type: String,
  },
  Date: {
    type: Date,
  },
  Quantity: {
    type: Number,
  },
  UnitPrice: {
    type: Number,
  },
  TotalPrice: {
    type: Number,
  },
});

module.exports = OrderDetail = mongoose.model("OrderDetail", OrderDetailSchema);
