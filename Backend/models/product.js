const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    ItemId: {
      type: Number,
      required: true,
    },
    product_name: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = Product = mongoose.model("Products", productSchema);
