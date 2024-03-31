const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  CustomerId: {
    type: String,
    required: true,
  },
  ItemID: {
    type: String,
  },
  CustomerName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Rating: {
    type: Number,
  },
  Feedback: {
    type: String,
  },
});

module.exports = Feedback = mongoose.model("Feedback", feedbackSchema);
