const express = require("express");

const OrderDetail = require("../models/orderDetail");

const routerOrderDetail = express.Router();

routerOrderDetail.get("/", (req, res) => {
  OrderDetail.find()
    .then((orderDetail) => res.json(orderDetail))
    .catch((error) =>
      res.status(404).json({ noOfSupplier: "No orderDetails found" })
    );
});
routerOrderDetail.get("/:id", (req, res) => {
  OrderDetail.findById(req.params.id)
    .then((orderDetail) => res.json(orderDetail))
    .catch(() => res.status(404).json({ msg: "cannot find orderDetails" }));
});
routerOrderDetail.post("/", (req, res) => {
  OrderDetail.create(req.body)
    .then(() => res.json({ msg: "orderDetails added Successfully" }))
    .catch(() => res.status(404).json({ msg: "cannot add orderDetails" }));
});
routerOrderDetail.delete("/:id", (req, res) => {
  OrderDetail.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "orderDetails Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find orderDetails ID" }));
});
routerOrderDetail.put("/:id", (req, res) => {
  OrderDetail.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "orderDetails Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerOrderDetail;
