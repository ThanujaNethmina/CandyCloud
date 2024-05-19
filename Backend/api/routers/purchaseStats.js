const express = require("express");
const router = express.Router();

// Import models
const Payment = require("../models/payment");
const Purchase = require("../models/purchase");
const { OrderItem } = require("../models/order-item");

// Get all purchase Stats
router.get("/", async (req, res) => {
  try {
    // Fetch all payments
    const payments = await Payment.find();

    // Fetch all purchases with populated orderItems
    const purchases = await Purchase.find().populate("orderItems");

    // Initialize an array to store order item statistics
    const purchaseStats = [];

    // Iterate over each purchase
    purchases.forEach((purchase) => {
      // Iterate over each order item in the purchase
      purchase.orderItems.forEach((orderItem) => {
        // Push order item statistics to the array
        purchaseStats.push({
          orderItem: orderItem,
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
      });
    });

    res.status(200).json({ purchaseStats });
  } catch (error) {
    console.error("Error fetching purchase stats:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
