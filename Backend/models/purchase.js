const mongoose = require("mongoose");
const { Schema } = mongoose;
//const { User } = require("./user");

const purchaseSchema = new Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  ],
  name: {
    type: String,
    trim: true,
    minlength: 4,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  productItemID: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "confirm",
  },
  action: {
    type: String,
    required: true,
    default: "pending",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});
//purchaseSchema.virtual("id").get(function () {
//return this._id.toHexString();
//});

purchaseSchema.set("toJSON", {
  virtuals: true,
});

//exports.Purchase = mongoose.model("Purchase", purchaseSchema);

//module.exports = Purchase;
const purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = purchase;
