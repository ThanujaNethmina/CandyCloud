const express = require("express");
const router = express.Router();

// Import models
const User = require("../models/customer");
const Product = require("../models/product");
const Payment = require("../models/payment");
const Purchase = require("../models/purchase");

// Get statistics
router.get("/", async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const purchasesCount = await Purchase.countDocuments();
    const ordersCount = await Payment.countDocuments();

    const result = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$price" },
        },
      },
    ]);

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({
      usersCount,
      productsCount,
      purchasesCount,
      ordersCount,
      revenue,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
