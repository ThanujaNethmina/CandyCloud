const express = require("express");

const Material = require("../models/Raw_Material");

const routerMaterial = express.Router();

routerMaterial.get("/", (req, res) => {
  Material.find()
    .then((material) => res.json(material))
    .catch((error) =>
      res.status(404).json({ noOfmaterials: "No Material found" })
    );
});
routerMaterial.get("/:id", (req, res) => {
  Material.findById(req.params.id)
    .then((material) => res.json(material))
    .catch(() => res.status(404).json({ msg: "cannot find material" }));
});
routerMaterial.post("/", (req, res) => {
  Material.create(req.body)
    .then(() => res.json({ msg: "Material added Successfully" }))
    .catch(() => res.status(404).json({ msg: "cannot add Material" }));
});
routerMaterial.delete("/:id", (req, res) => {
  Material.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Material Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find Material ID" }));
});
routerMaterial.put("/:id", (req, res) => {
  Material.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Material Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerMaterial;
