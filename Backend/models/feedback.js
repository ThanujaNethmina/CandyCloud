const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
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
  Status: {
    type: String,
  },
});

module.exports = Feedback = mongoose.model("Feedback", feedbackSchema);
