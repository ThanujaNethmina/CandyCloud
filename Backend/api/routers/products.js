/*const express = require("express");
const router = express.Router();
const Product = require("../../models/product");

//const productController = require("../../controllers/productControllers");

// Get all products
//router.get("/", productController.getAllProductItems);

//Add a product
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const category = req.body.category;
  const price = Number(req.body.price);
  const countinStock = Number(req.body.countInStock);

  const newProduct = new Product({
    name,
    image,
    category,
    price,
    countinStock,
  });

  newProduct
    .save()
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error saving product" });
    });
});

module.exports = router;*/

const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const productController = require("../controllers/productControllers");

//get all product items
router.get("/", productController.getAllProductItems);

router.route("/add").post((req, res) => {
  const { name, image, category, price, countInStock } = req.body;

  const newProduct = new Product({
    name,
    image,
    category,
    price: Number(price),
    countInStock: Number(countInStock),
  });

  newProduct
    .save()
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error saving product" });
    });
});

//Add a product
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const category = req.body.category;
  const price = Number(req.body.price);
  const countinStock = Number(req.body.countInStock);

  const newProduct = new Product({
    name,
    image,
    category,
    price,
    countinStock,
  });

  newProduct
    .save()
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error saving product" });
    });
});

module.exports = router;
