const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  CustomerName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
  },
  Pno: {
    type: String,
  },
  QuestionType: {
    type: String,
  },
  Question: {
    type: String,
  },
  Answer: {
    type: String,
  },
});

module.exports = FAQ = mongoose.model("FAQs", FAQSchema);
