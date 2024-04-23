import ShoppingCart from '../models/shoppingcarts.js';
import Products from '../models/produts.js';
import Feedback from '../models/feedback.js';
import ShippingDetails from '../models/shippingDetails.js'
import mongoose from 'mongoose';

// Controller for getting all shopping carts for a specific customer
export const getShoppingCartsItems = async (req, res) => {
  try {
    const { userID } = req.query;
    const shoppingCarts = await ShoppingCart.find({ userID: userID });
    if (shoppingCarts.length === 0) {
      return res.status(404).json({ error: true, message: "No shopping carts found for this customer" });
    }
    res.status(200).json(shoppingCarts);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};



// Controller for getting all product details
export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (products.length === 0) {
      return res.status(404).json({ error: true, message: "No products found" });
    }  
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};


// Controller for getting all feedback entries
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    if (feedbacks.length === 0) {
      return res.status(404).json({ error: true, message: "No feedback entries found" });
    }
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};




// Controller for getting all products with average ratings
export const getAllFeedbacksAndAverageRatings = async (req, res) => {
  try {
    // Retrieve all products from the Products collection
    const products = await Products.find();
    if (products.length === 0) {
      return res.status(404).json({ error: true, message: "No products found" });
    }

    // Create a map to store average ratings for each ItemID
    const averageRatingsMap = {};

    // Retrieve all feedback entries from the Feedback collection
    const feedbacks = await Feedback.find();

    // Calculate average ratings for each ItemID
    feedbacks.forEach((feedback) => {
      if (!averageRatingsMap[feedback.ItemID]) {
        averageRatingsMap[feedback.ItemID] = { totalRating: 0, count: 0 };
      }
      averageRatingsMap[feedback.ItemID].totalRating += feedback.Rating;
      averageRatingsMap[feedback.ItemID].count++;
    });

    // Enhance each product with its corresponding average ratings
    const productsWithAverageRatings = products.map((product) => {
      const { ItemId } = product;
      const averageRatingInfo = averageRatingsMap[ItemId];
      const averageRating = averageRatingInfo ? averageRatingInfo.totalRating / averageRatingInfo.count : 0;
      return {
        ...product.toObject(), // Convert Mongoose document to plain JavaScript object
        averageRating // Add average rating to the product object
      };
    });

    res.status(200).json(productsWithAverageRatings);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};


// Controller for creating a new shopping cart item
export const createShoppingCart = async (req, res) => {
  const { userId, ProductId } = req.body;

  try {
    // Check if a cart item with the same userId and ProductId already exists
    const existingCartItem = await ShoppingCart.findOne({ userId, ProductId });

    if (existingCartItem) {
      // If item exists, increase Qty by 1
      existingCartItem.Qty += 1;
      existingCartItem.TotalPrice = existingCartItem.UnitPrice * existingCartItem.Qty;  // Update TotalPrice based on new Qty
      const updatedCartItem = await existingCartItem.save();
      res.status(200).json(updatedCartItem);
    } else {
      // If no existing item, create a new cart item
      const shoppingCart = new ShoppingCart(req.body);
      const savedShoppingCart = await shoppingCart.save();
      res.status(201).json(savedShoppingCart);
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};


export const increaseCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.query;

    // Search for records with the provided userId and addressId
    const shoppingCartItems = await ShoppingCart.find({ userId, ProductId: productId });

    if (shoppingCartItems.length === 0) {
      // If no matching record found, call createShoppingCart function
      await createShoppingCart(req, res);
    } else {
      // If matching record found, call updateShoppingCart function
      const existingCartItem = shoppingCartItems[0];
      existingCartItem.Qty += 1;

      if (existingCartItem.Qty <= 0) {
        // If the quantity becomes zero or less, remove the item
        await existingCartItem.remove();
        res.status(200).json({ message: "Shopping cart item removed" });
      } else {
        // Otherwise, save the updated item
        const updatedCartItem = await existingCartItem.save();
        res.status(200).json(updatedCartItem);
      }
    }
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};



export const DecreaseCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.query;

    // Search for records with the provided userId and productId
    const shoppingCartItems = await ShoppingCart.find({ userId, ProductId: productId });

    if (shoppingCartItems.length === 0) {
      // If no matching record found, return error message
      return res.status(404).json({ error: true, message: "Product not found in cart" });
    }

    // If matching record found, update the quantity
    const existingCartItem = shoppingCartItems[0];
    existingCartItem.Qty -= 1;

    if (existingCartItem.Qty <= 0) {
      // If the quantity becomes zero or less, remove the item
      await existingCartItem.remove();
      return res.status(200).json({ message: "Shopping cart item removed" });
    }

    // Otherwise, save the updated item
    const updatedCartItem = await existingCartItem.save();
    res.status(200).json(updatedCartItem);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};


// Controller for updating an existing shopping cart item
export const updateShoppingCart = async (req, res) => {
  try {
    const updatedShoppingCart = await ShoppingCart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedShoppingCart);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

// Controller for deleting a shopping cart item
export const deleteShoppingCart = async (req, res) => {
  try {
    await ShoppingCart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Shopping cart item deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

// Controller for getting details of a specific shopping cart item
export const getShoppingCartDetails = async (req, res) => {
  try {
    const shoppingCart = await ShoppingCart.findById(req.params.id);
    if (!shoppingCart) {
      return res.status(404).json({ error: true, message: "Shopping cart item not found" });
    }
    res.status(200).json(shoppingCart);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};


export const updateUserCartShipping = async (req, res) => {
  const { userId } = req.params;
  const { shippingId } = req.body;

  try {
    // Update all cart items with the specified userId to the new ShippingId
    const updatedCartItems = await ShoppingCart.updateMany(
      { $match: { userId: mongoose.Types.ObjectId(userId) } }, // Filter to match only items belonging to the specified user
      { $set: { ShippingId: shippingId } } // Update action
    );

    if (updatedCartItems.matchedCount === 0) {
      res.status(404).send('No cart items found for this user');
    } else {
      res.status(200).json({
        message: "Cart items updated successfully",
        details: updatedCartItems
      });
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

export const generateUserReport = async (req, res) => {
  const { userId } = req.params; // Assuming you're getting userId from route params

  try {
      const cartItems = await ShoppingCart.find({ userId: userId });
      if (cartItems.length === 0) {
          return res.status(404).json({ message: "No cart items found for this user" });
      }

      // Fetch shipping details for each cart item
      const detailedCartItems = await Promise.all(cartItems.map(async (item) => {
          const shippingInfo = await ShippingDetails.findById(item.ShippingId);
          return {
              ...item.toObject(), // Convert MongoDB document to a plain JavaScript object
              shippingInfo
          };
      }));

      res.json(detailedCartItems);
  } catch (error) {
      console.error('Error retrieving cart items and shipping details:', error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};