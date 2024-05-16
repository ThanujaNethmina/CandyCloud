const express = require("express");
const router = express.Router();
const purchase = require("../models/purchase");
const { OrderItem } = require("../models/order-item");
const purchaseController = require("../controllers/purchaseControllers");

//get all product details-whenever clicks the buy Now button
router.get("/", purchaseController.getPurchseByEmail);

//To Order Manager-get Order all details-order history
router.get("/:email", purchaseController.getPurchseByEmail);

//To customer place order
router.post("/add", purchaseController.createPurchase);

//To order manager get purchases count using email
router.get("/:email/count", purchaseController.getPurchseCountByEmail);

router.delete(
  "/rejected",
  purchaseController.deleteRejectedPurchaseAndUpdateAction
);

//Identify specific purchase(read in CRUD)
router.get("/:id", purchaseController.getSpecificPurchase);
//To customer delete the purchase
router.delete("/:id", purchaseController.deletePurchase);

//To customer update the quantity of purchase
router.put("/:id", purchaseController.updatePurchase);

router.get("/:id", purchaseController.getSinglePurchase);

router.put("/:email/status", purchaseController.updateStatus);

router.get("/rejected", purchaseController.getRejectedPurchases);

router.get("/totalsales", purchaseController.getTotalsale);

router.get("/count", purchaseController.getPurchaseCount);

module.exports = router;
