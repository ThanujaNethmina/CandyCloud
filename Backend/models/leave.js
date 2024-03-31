const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  LeaveId: {
    type: String,
    required: true,
  },
  EmployeeID: {
    type: String,
  },
  EmployeeName: {
    type: String,
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

module.exports = Leaves = mongoose.model("Leaves", leaveSchema);
