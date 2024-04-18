const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  
  CustomerName: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Pno: {
    type: String,
    required: true,
  },
  
  QuestionType: {
    type: String,
    required: true,
  },
 
  Question: {
    type: String,
    required: true,
  },
  
  Answer: {
    type: String,
    required: true,
  },

});

module.exports = Faq = mongoose.model("Faq", faqSchema);
