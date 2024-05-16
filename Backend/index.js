const express = require("express");
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
require('dotenv').config();
const DBconnection = require("./config/db");
const router = require("./routes/employees");
const routerLeaves = require("./routes/leaves");
const routerCustomer = require("./routes/customers");
const routerFeedback = require("./routes/feedbacks");
const routerSupplier = require("./routes/suppliers");
const routerOrderDetail = require("./routes/orderDetails");
const routerProduct = require("./routes/products");
const routerFAQ = require("./routes/FAQs");
const routerAdmin = require("./routes/admins");
const routerMaterial = require("./routes/Raw_Materials");
const routerDelivery = require("./routes/deliveries");
const routerDriver = require("./routes/drivers");

const products = require("./routes/products");
const purchases = require("./routes/purchases");
const paymentRoutes = require("./routes/payments");
const adminStats = require("./routes/adminStats");
//const purchaseStats = require("./routes/purchaseStats");


const morgan = require("morgan");
const mongoose = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51P2W1wEXrthFHuX2oLbL2uEau93D7HDfwYpALOwxKTbJN4W6eKdCD4oG0N28734nAGSu7sYqrD2kiXia2K9bRube00aIhiiQuO"
);


const corsConfig = {
  credentials: true,
  origin: true,
};

const server = () => {
  db();
  app.listen(PORT, () => {
      console.log('Listening to port:', PORT);
  });
};

const bodyParser = require("body-parser");

const app = express();
//middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(cors());
//app.use((req, res, next) => {
//res.setHeader("Access-Control-Allow-Origin", "*");
//});

//import Routes
require("dotenv").config();
// db connection
DBconnection();

app.use("/api/employees", router);
app.use("/api/leaves", routerLeaves);
app.use("/api/customers", routerCustomer);
app.use("/api/feedbacks", routerFeedback);
app.use("/api/suppliers", routerSupplier);
app.use("/api/orderDetails", routerOrderDetail);
app.use("/api/products", routerProduct);
app.use("/api/FAQs", routerFAQ);
app.use("/api/admins", routerAdmin);
app.use("/api/Raw_Materials", routerMaterial);
app.use("/api/deliveries", routerDelivery);
app.use("/api/drivers", routerDriver);
app.use("/product", products);
app.use("/purchase", purchases);
app.use("/payments", paymentRoutes);
app.use("/adminStats", adminStats);
//app.use("/purchaseStats", purchaseStats);

readdirSync('./routes').map((file) => {
  if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const route = require(`./routes/${file}`);
      app.use('/api/v1', route);
  }
});


//stripe payment routes
// Create a PaymentIntent with the order amount and currency
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",

    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
