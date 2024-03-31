const express = require("express");

const Customers = require("../models/customer");

const routerCustomer = express.Router();

routerCustomer.get("/", (req, res) => {
  Customers.find()
    .then((leave) => res.json(leave))
    .catch((error) =>
      res.status(404).json({ noOfCustomers: "No Customers found" })
    );
});
routerCustomer.get("/:id", (req, res) => {
  Customers.findById(req.params.id)
    .then((leave) => res.json(leave))
    .catch(() => res.status(404).json({ msg: "cannot find Customers" }));
});
routerCustomer.post("/", (req, res) => {
  Customers.create(req.body)
    .then(() => res.json({ msg: "Customers added Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Add Customers" }));
});
routerCustomer.delete("/:id", (req, res) => {
  Customers.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Customers Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find Customers ID" }));
});
routerCustomer.put("/:id", (req, res) => {
  Customers.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Customers Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerCustomer;
