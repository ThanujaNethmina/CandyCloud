const router = require("express").Router();
const Product = require("../models/product");

// Function to fetch additional data
const fetchAdditionalData = async () => {
    // Fetch additional data from another source
    // For simplicity, let's assume we're just returning a static object here
    return {
        additionalField: "Additional Data"
    };
};

// Get all products with additional data
router.route("/").get(async (req, res) => {
    try {
        // Fetch products from MongoDB
        const products = await Product.find();

        // Fetch additional data
        const additionalData = await fetchAdditionalData();

        // Combine products with additional data
        const combinedData = products.map(product => {
            return {
                ...product.toObject(), // Convert Mongoose object to plain JavaScript object
                additionalField: additionalData.additionalField // Assuming additional data is static
            };
        });

        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Add product
router.route("/add").post((req, res) => {
    const { itemId, productName, quantity, value, expiredDate, manufacturedDate, ROL } = req.body;

    const newProduct = new Product({
        item_id: itemId,
        product_name: productName,
        Quantity: quantity,
        value: value,
        Expired_date: expiredDate,
        Manufactured_Date: manufacturedDate,
        ROL: ROL
    });

    newProduct.save()
        .then(() => {
            res.json("Product added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error adding product" });
        });
});

// Update product
router.route("/update/:id").put(async (req, res) => {
    const productId = req.params.id;
    const { itemId, productName, quantity, value, expiredDate, manufacturedDate, ROL } = req.body;

    const updateProduct = {
        item_id: itemId,
        product_name: productName,
        Quantity: quantity,
        value: value,
        Expired_date: expiredDate,
        Manufactured_Date: manufacturedDate,
        ROL: ROL
    };

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateProduct, { new: true });
        res.status(200).send({ status: "Product updated", product: updatedProduct });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating product" });
    }
});

// Delete product
router.delete("/delete/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ status: "Product deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error deleting product" });
    }
});

// Get product by ID
router.route("/get/:id").get(async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        res.status(200).send({ status: "Product fetched", product: product });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching product" });
    }
});

module.exports = router;
