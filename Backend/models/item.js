const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 4,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
  },
});

//productSchema.virtual("id").get(function () {
//return this._id.toHexString();
///});

//productSchema.set("toJSON", {
//virtuals: true,
//});
//exports.Product=mongoose.model('Product',productSchema);

const Items = mongoose.model("Item", itemSchema);
module.exports = Items;
