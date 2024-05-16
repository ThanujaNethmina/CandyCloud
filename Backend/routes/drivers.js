const express = require("express");

const Driver = require("../models/driver");

const routerDriver = express.Router();

routerDriver.get("/", (req, res) => {
  Driver.find()
    .then((drivers) => res.json(drivers))
    .catch((error) =>
      res.status(404).json({ noOfDrivers: "No drivers found" })
    );
});
routerDriver.get("/:id", (req, res) => {
  Driver.findById(req.params.id)
    .then((drivers) => res.json(drivers))
    .catch(() => res.status(404).json({ msg: "cannot find drivers" }));
});
routerDriver.post("/", (req, res) => {
  Driver.create(req.body)
    .then(() => res.json({ msg: "Driver added Sucessufully" }))
    .catch(() => res.status(404).json({ msg: "cannot add Driver" }));
});
routerDriver.delete("/:id", (req, res) => {
  Driver.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Driver Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find Driver ID" }));
});
routerDriver.put("/:id", (req, res) => {
  Driver.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Driver Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerDriver;
