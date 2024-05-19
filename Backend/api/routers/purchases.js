/*//const product = require("../models/product");
const express = require("express");
const purchase = require("../../models/purchase");
const router = express.Router();

const purchaseController = require("../../controllers/purchaseControllers");

const { updateStatus } = require("../../controllers/purchaseControllers");
const {
  deleteRejectedPurchaseAndUpdateAction,
} = require("../../controllers/purchaseControllers");

//get all product details-whenever clicks the buy Now button
router.get("/", purchaseController.getPurchseByEmail);

//To Order Manager-get Order all details-order history
router.get("/:email", purchaseController.getPurchseByEmail);

//To customer place order
router.post("/add", purchaseController.createPurchase);

//To order Manager can delete the (status==reject) only orders-------when(status==reject)
router.delete(
  "/rejected",
  purchaseController.deleteRejectedPurchaseAndUpdateAction,
);

//To customer delete an item or order(should think what is)
router.delete("/:id", purchaseController.deletePurchase);

//To customer update quantity
router.put("/:id", purchaseController.updatePurchase);

//get single item
router.get("/:id", purchaseController.getSinglePurchase);

//To order Manager update the order status to confirm/accept/reject
router.put("/:email/status", purchaseController.updateStatus);

//To order Manager view the new action as "ask substituttion" with oderID
router.get("/rejected", purchaseController.getRejectedPurchases);

//To order Manager get the total Sales of the items upto now
router.get("/totalsales", purchaseController.getTotalsale);

//To order manager can be able to calculate the count of all purchases that selled
router.get("/count", purchaseController.getPurchaseCount);

module.exports = router;*/

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

//Identify specific purchase(read in CRUD)
router.get("/:id", purchaseController.getSpecificPurchase);
//To customer delete the purchase
router.delete("/:id", purchaseController.deletePurchase);

//To customer update the quantity of purchase
router.put("/:id", purchaseController.updatePurchase);

router.get("/:id", purchaseController.getSinglePurchase);

router.put("/:email/status", purchaseController.updateStatus);

//To order manager can reject purchases
router.delete("/_id", purchaseController.deleteRejectedPurchases);

router.get("/totalsales", purchaseController.getTotalsale);

router.get("/count", purchaseController.getPurchaseCount);

module.exports = router;
