const express = require("express");

const ShoppingCart = require("../models/shoppingcart");

const routerShoppingcart = express.Router();

// router.get("/test",(req,res)=>res.send("Employee Routes"));
//@route GET api/employee/
//@desc Reading employees
//@access public
routerShoppingcart.get("/", (req, res) => {
  ShoppingCart.find()
    .then((shoppingcart) => res.json(shoppingcart))
    .catch((error) => res.status(404).json({ noOfItem: "No Items found" }));
});
routerShoppingcart.get("/:id", (req, res) => {
  ShoppingCart.findById(req.params.id)
    .then((shoppingcart) => res.json(shoppingcart))
    .catch(() => res.status(404).json({ msg: "cannot find items" }));
});
routerShoppingcart.post("/", (req, res) => {
  ShoppingCart.create(req.body)
    .then(() => res.json({ msg: "ShoppingCart item added Sucessufully" }))
    .catch(() => res.status(404).json({ msg: "cannot add ShoppingCart item" }));
});
routerShoppingcart.delete("/:id", (req, res) => {
  ShoppingCart.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "ShoppingCart item Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find ShoppingCart ID" }));
});
routerShoppingcart.put("/:id", (req, res) => {
  ShoppingCart.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "ShoppingCart Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerShoppingcart;
