const Product = require("../models/product");

const getAllProductItems = async (req, res) => {
  try {
    const productList = await Product.find({});
    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const pr = await Promise.all(
      req.body.productList.map(async (productList) => {
        return newProduct;
      })
    );

    const newProduct = new Purchase({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
    });

    const savedProduct = await newProduct.save();

    if (!savedProduct) return res.status(400).send("product cannot be created");

    res.send(savedProduct);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllProductItems,
  createProduct,
};
