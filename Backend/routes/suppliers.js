const express = require("express");

const Supplier = require("../models/supplier");

const routerSupplier = express.Router();

routerSupplier.get("/", (req, res) => {
  Supplier.find()
    .then((supplier) => res.json(supplier))
    .catch((error) =>
      res.status(404).json({ noOfSupplier: "No supplier found" })
    );
});
routerSupplier.get("/:id", (req, res) => {
  Supplier.findById(req.params.id)
    .then((supplier) => res.json(supplier))
    .catch(() => res.status(404).json({ msg: "cannot find supplier" }));
});
routerSupplier.post("/", (req, res) => {
  Supplier.create(req.body)
    .then(() => res.json({ msg: "Supplier added Successfully" }))
    .catch(() => res.status(404).json({ msg: "cannot add Supplier" }));
});
routerSupplier.delete("/:id", (req, res) => {
  Supplier.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Supplier Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find Supplier ID" }));
});
routerSupplier.put("/:id", (req, res) => {
  Supplier.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Supplier Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerSupplier;
