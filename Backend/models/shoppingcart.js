const mongoose = require("mongoose");

const shoppingcartSchema = new mongoose.Schema({
  ProductId: {
    type: String,
    required: true,
  },
  CustomerID: {
    type: String,
  },
  CustomerName: {
    type: String,
  },
  ProductName: {
    type: String,
  },
  UnitPrice: {
    type: Number,
  },
  Qty: {
    type: Number,
  },
  TotalPrice: {
    type: Number,
  },
});

module.exports = ShoppingCart = mongoose.model(
  "ShoppingCart",
  shoppingcartSchema
);
