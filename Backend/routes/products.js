const express = require("express");

const Product = require("../models/product");

const routerProduct = express.Router();

routerProduct.get("/", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((error) =>
      res.status(404).json({ noOfproducts: "No Product found" })
    );
});
routerProduct.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch(() => res.status(404).json({ msg: "cannot find product" }));
});
routerProduct.post("/", (req, res) => {
  Product.create(req.body)
    .then(() => res.json({ msg: "Product added Successfully" }))
    .catch(() => res.status(404).json({ msg: "cannot add product" }));
});
routerProduct.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Product Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find Product ID" }));
});
routerProduct.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Product Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerProduct;
