const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  EmployeeId: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
  },
  Age: {
    type: Number,
  },
  Email: {
    type: String,
  },
  Address: {
    type: String,
  },
  Designation: {
    type: String,
  },
  Salary: {
    type: Number,
  },
  AllowancesType: {
    type: String,
  },
  AllowancesAmount: {
    type: Number,
  },
  OThours: {
    type: Number,
  },
  AmountPerHour: {
    type: Number,
  },
  TotalSalary: {
    type: Number,
  },
  Image: {
    type: String,
  },
});

module.exports = Employee = mongoose.model("Employees", employeeSchema);
