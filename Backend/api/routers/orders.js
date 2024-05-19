const express = require("express");
const { Order } = require("../api/models/models/order");
const { OrderItem } = require("../api/models/models/order-item");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderList = await Order.find();
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  //req.send('orderList');
  res.json(orderList);
});

router.post(`/`, async (req, res) => {
  const orderItemsIds = req.body.orderItems.map(async (orderItem) => {
    let newOrderItem = new OrderItem({
      quantity: orderItem.quantity,
      product: orderItem.product,
    });

    newOrderItem = await newOrderItem.save();

    return newOrderItem;
  });

  console.log(orderItemsIds);
  let order = new Order({
    orderItems: orderItemsIds,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  });

  //order=await order.save();
  if (!order) {
    return res.status(400).send("order cannot be created");
  }
  res.json(order);
});

module.exports = router;
