//const { OrderItem } = require("../models/order-item")
//const OrderItem = require("../models/orderItem");
const purchase = require("../models/purchase");
const { OrderItem } = require("../models/order-item");
//const express = require("express");
//const router = express.Router();

//As an order manager,he can be able to get any details about the purchase item before as well as previous

const getPurchseByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    //console.log(email);
    const query = { email: email };
    const result = await purchase.find(query).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//customer place an order (new order placing)-POST a purchase when clicks buyNow button
//using POST method placing order because we have an array of order-item
//Order Manager can be able to calculating the total price according to the quantity when its placing

/*try {
    const orderItemIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });

        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      }),
    );

    const OrderItemIdsResolved = await orderItemIds;

    // Calculate total price by summing up individual order item prices
    let totalPrice = 0;
    for (const orderItemId of OrderItemIdsResolved) {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price",
      );
      totalPrice += orderItem.product.price * orderItem.quantity;
    }

    const newPurchase = new purchase({
      orderItems: OrderItemIdsResolved,
      email: req.body.email,
      phone: req.body.phone,
      status: req.body.status,
      action: req.body.action,
      totalPrice: totalPrice, // Assign the calculated total price
      user: req.body.user,
    });

    const savedPurchase = await newPurchase.save();

    if (!savedPurchase)
      return res.status(400).send("Purchase cannot be created");

    res.send(savedPurchase);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }*/

const createPurchase = async (req, res) => {
  const {
    orderItems,
    name,
    image,
    price,
    quantity,
    productItemID,
    email,
    phone,
    status,
    action,
    dateOrdered,
  } = req.body;

  try {
    // Create an array to store the OrderItem objects
    const orderItemObjects = [];

    // Loop through each order item in the request body
    for (const orderItem of orderItems) {
      // Create a new OrderItem object
      const newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      // Save the OrderItem object and push its ID to the array
      const savedOrderItem = await newOrderItem.save();
      orderItemObjects.push(savedOrderItem._id);
    }

    // Create the new purchase object
    const newPurchase = new purchase({
      orderItems: orderItemObjects,
      name,
      image,
      price,
      quantity,
      productItemID,
      email,
      phone,
      status,
      action,
      dateOrdered,
    });

    // Save the new purchase object
    const savedPurchase = await newPurchase.save();

    res.status(201).json(savedPurchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get purchaseCount using email
const getPurchseCountByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    //console.log(email);
    const filter = { email: email };
    const count = await purchase.countDocuments(filter); // Used countDocuments to get the count directly
    res.json({ count: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get specific purchase===== {I think not working}
const getSpecificPurchase = async (req, res) => {
  const purchaseId = req.params.id;
  try {
    //existing purchase or not
    const purchaseItem = await purchase.findById(purchaseId);
    res.status(200).json(purchaseItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete a item from purchase by ID
const deletePurchase = async (req, res) => {
  const purchaseId = req.params.id;
  try {
    const deletedPurchase = await purchase.findByIdAndDelete(purchaseId);

    if (!deletedPurchase) {
      return res
        .status(401)
        .json({ message: "Purchase item cannot be found!" });
    }
    res.status(200).json({ message: "Purchase item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update a item from purchase by ID
const updatePurchase = async (req, res) => {
  const purchaseId = req.params.id;
  const { quantity } = req.body;

  try {
    //exsiting purchase or not
    const updatedPurchase = await purchase.findByIdAndUpdate(
      purchaseId,
      { quantity },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPurchase) {
      return res
        .status(404)
        .json({ message: "quantity item cannot be found!" });
    }
    res.status(200).json(updatedPurchase);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//get a Single purchase by ID
const getSinglePurchase = async (req, res) => {
  const purchaseId = req.params.id;
  try {
    //existing purchase or not
    const purchaseItem = await purchase.findById(purchaseId);
    res.status(200).json(purchaseItem);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//As an order manager,he can be able to update the order status by the "aunji@gmail.com/status"

const updateStatus = async (req, res) => {
  const { email } = req.params;
  const { status } = req.body;

  try {
    const updatedPurchase = await purchase.findOneAndUpdate(
      { email: email },
      { status: status },
      { new: true, runValidators: true }
    );

    if (!updatedPurchase) {
      return res
        .status(404)
        .json({ message: "Purchase item cannot be found!" });
    }

    res.status(200).json(updatedPurchase);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/*As an order manager,he can be able to delete purchase as the "acttion",when 
only status that given before is=> if(status==reject) and update the "action"
as to "ask the substitution"*/

const deleteRejectedPurchaseAndUpdateAction = async (req, res) => {
  try {
    // Find the rejected purchases
    const rejectedPurchases = await Purchase.find({ status: "reject" });

    if (!rejectedPurchases.length) {
      return res.status(404).json({ message: "No rejected purchases found" });
    }

    // Iterate over each rejected purchase
    await Promise.all(
      rejectedPurchases.map(async (purchase) => {
        // Remove unnecessary details from the purchase
        purchase.orderItems = [];
        purchase.email = "";
        purchase.phone = "";
        purchase.totalPrice = null;

        // Update the action to "Ask for substitution"
        purchase.action = "Ask for substitution";

        // Save the modified purchase (without order ID and other details)
        await purchase.save();
      })
    );

    res.status(200).json({
      message:
        "Rejected purchase details deleted and action updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//TO see the rejected and deleted purchases action with its id

const getRejectedPurchases = async (req, res) => {
  try {
    // Find the rejected purchases
    const rejectedPurchases = await purchase.find({ status: "reject" });

    if (!rejectedPurchases.length) {
      return res.status(404).json({ message: "No rejected purchases found" });
    }

    // Extract relevant details (purchase ID and action) from rejected purchases
    const rejectedPurchaseDetails = rejectedPurchases.map((purchase) => ({
      purchaseId: purchase._id,
      action: purchase.action,
    }));
    //await purchase.save();

    res.status(200).json(rejectedPurchaseDetails);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/*Order manager can be able to view all sales total prices,even it has rejected purchases(rejected-->totalPrice=null of that purchase)
or not there any not rejected purchases(not rejected-->all totalPrice can be sum to get the final totalPrice)*/

const getTotalsale = async (req, res) => {
  try {
    const hasNullTotalPrice = await purchase.exists({ totalPrice: null });

    if (hasNullTotalPrice) {
      // If there are documents with totalPrice as null, calculate the sum excluding those
      const totalSales = await purchase.aggregate([
        { $match: { totalPrice: { $ne: null } } }, // Exclude documents where totalPrice is null
        {
          $group: {
            _id: null,
            totalsales: { $sum: "$totalPrice" },
          },
        },
      ]);
      res.status(200).json({
        totalsales: totalSales.length > 0 ? totalSales[0].totalsales : 0,
      });
    } else {
      // If there are no documents with totalPrice as null, calculate the sum of all totalPrice values
      const allTotalSales = await purchase.aggregate([
        {
          $group: {
            _id: null,
            totalsales: { $sum: "$totalPrice" },
          },
        },
      ]);
      res.status(200).json({
        totalsales: allTotalSales.length > 0 ? allTotalSales[0].totalsales : 0,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//Order mnager can be able to calculate all purchases count

const getPurchaseCount = async (req, res) => {
  try {
    const purchaseCount = await purchase.countDocuments((count) => count);

    if (!purchaseCount) {
      return res.status(500).json({ success: false });
    }
    res.send({
      purchaseCount: purchaseCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getPurchseByEmail,
  createPurchase,
  getPurchseCountByEmail,
  getSpecificPurchase,
  deletePurchase,
  updatePurchase,
  getSinglePurchase,
  updateStatus,
  deleteRejectedPurchaseAndUpdateAction,
  getRejectedPurchases,
  getTotalsale,
  getPurchaseCount,
};
