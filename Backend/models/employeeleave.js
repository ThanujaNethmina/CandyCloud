const mongoose = require("mongoose");

const employeeLeaveSchema = new mongoose.Schema({
  EmployeeID: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
  },
  Date: {
    type: Date,
  },
  LeaveReason: {
    type: String,
  },
  Status: {
    type: String,
  },
  StatusReason: {
    type: String,
  },
});

module.exports = EmployeeLeave = mongoose.model(
  "EmployeeLeave",
  employeeLeaveSchema
);
