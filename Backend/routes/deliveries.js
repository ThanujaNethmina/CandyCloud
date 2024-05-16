const express = require("express");

const Delivery = require("../models/delivery");

const routerDelivery = express.Router();

routerDelivery.get("/", (req, res) => {
  Delivery.find()
    .then((deliveries) => res.json(deliveries))
    .catch((error) =>
      res.status(404).json({ noOfDeliveries: "No deliveries found" })
    );
});
routerDelivery.get("/:id", (req, res) => {
  Delivery.findById(req.params.id)
    .then((deliveries) => res.json(deliveries))
    .catch(() => res.status(404).json({ msg: "cannot find deliveries" }));
});
routerDelivery.post("/", (req, res) => {
  Delivery.create(req.body)
    .then(() => res.json({ msg: "Delivery added Sucessufully" }))
    .catch(() => res.status(404).json({ msg: "cannot add Delivery" }));
});
routerDelivery.delete("/:id", (req, res) => {
  Delivery.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Delivery Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find Delivery ID" }));
});
routerDelivery.put("/:id", (req, res) => {
  Delivery.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Delivery Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerDelivery;
