const express = require("express");

const EmployeeLeave = require("../models/employeeleave");

const routerEmployeeLeave = express.Router();

routerEmployeeLeave.get("/", (req, res) => {
  EmployeeLeave.find()
    .then((employeeleave) => res.json(employeeleave))
    .catch((error) =>
      res.status(404).json({ noOfReqLeaves: "No ReqLeaves found" })
    );
});
routerEmployeeLeave.get("/:id", (req, res) => {
  EmployeeLeave.findById(req.params.id)
    .then((employeeleave) => res.json(employeeleave))
    .catch(() => res.status(404).json({ msg: "cannot find ReqLeaves" }));
});
routerEmployeeLeave.post("/", (req, res) => {
  EmployeeLeave.create(req.body)
    .then(() => res.json({ msg: "ReqLeaves added Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Add ReqLeaves" }));
});
routerEmployeeLeave.delete("/:id", (req, res) => {
  EmployeeLeave.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "ReqLeaves Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find ReqLeave ID" }));
});
routerEmployeeLeave.put("/:id", (req, res) => {
  EmployeeLeave.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "ReqLeaves Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerEmployeeLeave;
