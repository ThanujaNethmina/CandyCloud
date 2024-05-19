const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const payment = require("../models/payment");
const Purchase = require("../models/purchase");
const Payment = require("../models/payment");
const ObjectId = mongoose.Types.ObjectId;

//customer post payment information to the database
router.post("/", async (req, res) => {
  const paymentData = req.body;
  try {
    const paymentRequest = await payment.create(paymentData);

    //delete purchase after payment is successfully done
    const purchaseIds = paymentData.purchaseItems.map((id) => new ObjectId(id));
    const deletePurchaseRequest = await Purchase.deleteMany({
      _id: { $in: purchaseIds },
    });

    res.status(200).json({ paymentRequest, deletePurchaseRequest });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//admin can get details of the payment using email
router.get("/", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ message: "Email is missing" });
  }
  try {
    // Proceed with fetching payment details based on the email parameter
    const result = await Payment.find({ email: email })
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//admin can get all payments
router.get("/all", async (req, res) => {
  try {
    const payments = await payment.find({}).sort({ createdAt: -1 }).exec();
    res.status(200).json(payments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//admin confirm payment status-update order status
router.patch("/:id", async (req, res) => {
  const payId = req.params.id;
  const { status } = req.body;
  try {
    const updatedStatus = await payment.findByIdAndUpdate(
      payId,
      { status: "Order Accepted and Confirmed" },
      { new: true, runValidators: true },
    );

    if (!updatedStatus) {
      return res.status(404).json({ message: "payment not found" });
    }
    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//admin can reject order by the transition Id
router.delete("/:transitionId", async (req, res) => {
  const transitionId = req.params.transitionId;
  try {
    const deletedPayment = await payment.findOneAndDelete({ transitionId });

    if (!deletedPayment) {
      return res.status(404).json({ message: "Rejection payment not found" });
    }

    res.status(200).json({ message: "Order Rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define route to handle POST request for rejection
router.post("/:transitionId/reject", async (req, res) => {
  const transitionId = req.params.transitionId;
  const { reason } = req.body;

  try {
    // Find the payment by transitionId and update the rejection details
    const updatedPayment = await Payment.findOneAndUpdate(
      { transitionId },
      { $set: { status: "Rejected", rejectionReason: reason } },
      { new: true },
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/*}
//https://localhost:3000/payments/add
//Add a payment
router.route("/add").post((req, res) => {
  const CardHoldername = req.body.CardHoldername;
  const MethodType = req.body.MethodType;
  const TotalPrice = Number(req.body.TotalPrice);
  const TotalItems = Number(req.body.TotalItems);
  const CardNumber = Number(req.body.CardNumber);
  const CVNNumber = Number(req.body.CVNNumber);
  const ExpiredDate = req.body.ExpiredDate;
  const PaymentStatus = req.body.PaymentStatus;

  const newPayment = new Payment({
    CardHoldername,
    MethodType,
    TotalPrice,
    TotalItems,
    CardNumber,
    CVNNumber,
    ExpiredDate,
    PaymentStatus,
  });

  newPayment
    .save()
    .then(() => {
      res.json("payment is added");
    })
    .catch(() => {
      console.log(err);
    });
});

//read(get) a payment
//https://localhost:3000/payments

router.route("/").get((req, res) => {
  //findbyId--one person details getting//so I got payment as a variable name not payments
  //find--get all persons details
  Payment.findById()
    .then((payment) => {
      res.json(payment);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update the payment by paymentId
//https://localhost:3000/payments/update/5555s5sgsgggsghdguyd
//async uses when coming lots of reqs,async see and awaiting and promising to do that work after did previous one

router.route("/update/:paymentTokenID").put(async (req, res) => {
  //get the payment id by a variable-as a parameter
  let paymentTokenID = req.params.paymentTokenID;
  const { PaymentStatus } = req.body;
  const updateStudent = {
    PaymentStatus,
  };
  const update = await Payment.findByIdAndUpdate(paymentTokenID, updateStudent)
    .then(() => {
      res.status(200).send({ PaymentStatus: "payment status updated by me" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        PaymentStatus: "error with updating status",
        error: err.message,
      }); //give error to the frontend
    });
});

//cancel the payment
router.route("delete/paymentTokenID").delete(async (req, res) => {
  let paymentTokenID = req.params.paymentTokenID;

  //directly can delete without fetching data frm frontend
  await Payment.findByIdAndUpdate(paymentTokenID)
    .then(() => {
      res
        .status(200)
        .send({ PaymentStatus: "payment is cancelled by customer" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        PaymentStatus: "error with canceling payment",
        error: err.message,
      }); //give error to the frontend
    });
});

//get payment Details by email of the customer
router.route("/get/:email").get(async (req, res) => {
  let email = req.params.email;
  const getting = await Payment.findOne(email)
    .then(() => {
      res.status(200).send({
        PaymentStatus: "fetched user payment data and now can see",
        user: getting,
      });
    })
    .catch((err) => {
      res.status(500).send({
        PaymentStatus: "error with fetching data",
        error: err.message,
      }); //give error to the frontend
    });
});
*/

module.exports = router;
