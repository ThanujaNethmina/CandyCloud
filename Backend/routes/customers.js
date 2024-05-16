const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customers = require("../models/customer");

const routerCustomer = express.Router();

routerCustomer.get("/count", async (req, res) => {
  try {
    const count = await Customers.countDocuments();
    res.json({ status: "success", data: count });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

routerCustomer.get("/", async (req, res) => {
  try {
    const customers = await Customers.find();
    res.json(customers);
  } catch (error) {
    res.status(404).json({ noOfCustomers: "No Customers found" });
  }
});

routerCustomer.get("/:id", async (req, res) => {
  try {
    const customer = await Customers.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: "Cannot find Customer" });
    }
    res.json(customer);
  } catch (error) {
    res.status(404).json({ msg: "Cannot find Customer" });
  }
});

routerCustomer.post("/login1", (req, res) => {
  const { Email, Password } = req.body;
  Customer.findOne({ Email: Email }).then((user) => {
    if (user) {
      if (user.Password == Password) {
        res.json("Success");
      } else {
        res.json("the password is incorrect");
      }
    }
  });
});

routerCustomer.post("/", async (req, res) => {
  try {
    await Customers.create(req.body);
    res.json({ msg: "Customer added Successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Cannot Add Customer" });
  }
});

routerCustomer.delete("/:id", async (req, res) => {
  try {
    await Customers.findByIdAndDelete(req.params.id);
    res.json({ msg: "Customer Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Cannot Find Customer ID" });
  }
});

routerCustomer.put("/:id", async (req, res) => {
  try {
    await Customers.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Customer Updated Successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Cannot Update" });
  }
});

module.exports = routerCustomer;
