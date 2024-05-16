const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
  },
  pNo: {
    type: String,
  },
  Address: {
    type: String,
  },
  Password: {
    type: String,
    required: true,
  },
});

module.exports = Admin = mongoose.model("Admins", adminSchema);
