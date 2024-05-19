const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51P2W1wEXrthFHuX2oLbL2uEau93D7HDfwYpALOwxKTbJN4W6eKdCD4oG0N28734nAGSu7sYqrD2kiXia2K9bRube00aIhiiQuO",
);
//send email
var nodemailer = require("nodemailer");

//const axios = require("axios");
const port = process.env.PORT || 3001;

//middleWare
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
//import Routes
require("dotenv").config();

//mongodb connection
mongoose
  .connect(
    "mongodb+srv://anujithrimanna:vNbdDcQZSO67M23x@demo-sweets-client.jszbmxz.mongodb.net/?retryWrites=true&w=majority&appName=demo-sweets-client",
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

//import routes

const products = require("./api/routers/products");
const purchases = require("./api/routers/purchases");
const paymentRoutes = require("./api/routers/payments");
const adminStats = require("./api/routers/adminStats");
const purchaseStats = require("./api/routers/purchaseStats");
app.use("/product", products);
app.use("/purchase", purchases);
app.use("/payments", paymentRoutes);
app.use("/adminStats", adminStats);
app.use("/purchaseStats", purchaseStats);

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

//send email
function sendEmail({ recipient_email, subject, reason }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anuji.thrimanna@gmail.com",
        pass: "anuji1208",
      },
    });

    const mailOptions = {
      from: "anuji.thrimanna@gmail.com",
      to: recipient_email,
      subject: subject,
      text: reason,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email sending error:", error);
        reject({ message: "An error occurred while sending the email" });
      } else {
        console.log("Email sent successfully:", info.response);
        resolve({ message: "Email sent successfully" });
      }
    });
  });
}

app.get("/", (req, res) => {
  sendEmail()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.post("/send_email", async (req, res) => {
  try {
    const { recipient_email, subject, reason } = req.body;
    console.log("Email details:", recipient_email, subject, reason); // Debugging line
    const response = await sendEmail({ recipient_email, subject, reason });
    console.log("Email sent response:", response);
    res.send(response.message);
  } catch (error) {
    console.error("Error sending email:", error); // Debugging line
    res.status(500).json({ error: error.message });
  }
});

//add route handler tothe 3000 page
app.get("/", (req, res) => {
  res.send("welcome and its working!");
});

app.listen(port, () => {
  console.log(`Server is running now at ${port}`);
});
