const express = require("express");
const router = express.Router();
const User = require("../models/models/user");

// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to get user by ID
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//add new user
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const city = req.body.city;
  const address = req.body.address;
  const zip = Number(req.body.zip);
  const Orderpassword = req.body.Orderpassword;
  const email = req.body.email;
  //const OrderStatus=req.body.OrderStatus;
  //const OrderAction=req.body.OrderAction

  const newUser = new User({
    name,
    city,
    address,
    zip,
    Orderpassword,
    email,
    //OrderStatus,
    //OrderAction
  });

  newUser
    .save()
    .then(() => {
      res.json("user is added");
    })
    .catch((error) => {
      console.log(error);
    });
});

// Route to create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
/*
// Route to update user by ID
router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route to delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
*/
module.exports = router;
