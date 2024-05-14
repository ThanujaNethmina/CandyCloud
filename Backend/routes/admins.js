const express = require("express");

const Admin = require("../models/admin");

const routerAdmin = express.Router();

// router.get("/test",(req,res)=>res.send("Employee Routes"));
//@route GET api/employee/
//@desc Reading employees
//@access public

routerAdmin.get("/count", (req, res) => {
  Admin.countDocuments()
    .then((count) => res.json({ status: "success", data: count }))
    .catch((error) =>
      res.status(500).json({ status: "error", message: error.message })
    );
});

routerAdmin.get("/", (req, res) => {
  Admin.find()
    .then((admins) => res.json(admins))
    .catch((error) => res.status(404).json({ noOfAdmins: "No Admins found" }));
});
routerAdmin.get("/:id", (req, res) => {
  Admin.findById(req.params.id)
    .then((admin) => res.json(admin))
    .catch(() => res.status(404).json({ msg: "cannot find admins" }));
});
routerAdmin.post("/", (req, res) => {
  Admin.create(req.body)
    .then(() => res.json({ msg: "Admin added Successfully" }))
    .catch(() => res.status(404).json({ msg: "cannot add admin" }));
});
routerAdmin.delete("/:id", (req, res) => {
  Admin.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Admin Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find Admin ID" }));
});
routerAdmin.put("/:id", (req, res) => {
  Admin.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Admin Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerAdmin;
