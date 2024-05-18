const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  SupplierID: {
    type: String,
    required: true,
  },
  SupplierName: {
    type: String,
  },
  SupplyingItem: {
    type: String,
  },
  Email: {
    type: String,
  },
});

module.exports = Supplier = mongoose.model("Supplier", supplierSchema);
