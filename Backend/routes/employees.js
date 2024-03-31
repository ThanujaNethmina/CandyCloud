const express = require("express");

const Employee = require("../models/employee");

const router = express.Router();

// router.get("/test",(req,res)=>res.send("Employee Routes"));
//@route GET api/employee/
//@desc Reading employees
//@access public
router.get("/", (req, res) => {
  Employee.find()
    .then((employees) => res.json(employees))
    .catch((error) =>
      res.status(404).json({ noOfEmployees: "No Employees found" })
    );
});
router.get("/:id", (req, res) => {
  Employee.findById(req.params.id)
    .then((employee) => res.json(employee))
    .catch(() => res.status(404).json({ msg: "cannot find leaves" }));
});
router.post("/", (req, res) => {
  Employee.create(req.body)
    .then(() => res.json({ msg: "Employee added Sucessufully" }))
    .catch(() => res.status(404).json({ msg: "cannot add employee" }));
});
router.delete("/:id", (req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Employee Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find Employee ID" }));
});
router.put("/:id", (req, res) => {
  Employee.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Employee Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = router;
