const express = require("express");

const Leaves = require("../models/leave");

const routerLeaves = express.Router();

routerLeaves.get("/", (req, res) => {
  Leaves.find()
    .then((leave) => res.json(leave))
    .catch((error) => res.status(404).json({ noOfLeaves: "No Leaves found" }));
});
routerLeaves.get("/:id", (req, res) => {
  Leaves.findById(req.params.id)
    .then((leave) => res.json(leave))
    .catch(() => res.status(404).json({ msg: "cannot find employee" }));
});
routerLeaves.post("/", (req, res) => {
  Leaves.create(req.body)
    .then(() => res.json({ msg: "Leave added Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Add Leaves" }));
});
routerLeaves.delete("/:id", (req, res) => {
  Leaves.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Leave Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find Leave ID" }));
});
routerLeaves.put("/:id", (req, res) => {
  Leaves.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Leave Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerLeaves;
