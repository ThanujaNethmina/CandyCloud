import ShippingDetails from '../models/shippingDetails.js';

// Controller for creating a new shipping address
export const createShippingAddress = async (req, res) => {
  try {
    // Create a new shipping address instance using req.body
    const newShippingAddress = new ShippingDetails(req.body);

    // Save the shipping address to the database
    const savedShippingAddress = await newShippingAddress.save();

    // Respond with the saved shipping address
    res.status(201).json(savedShippingAddress);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(400).json({ error: true, message: error.message });
  }
};


// Controller for reading shipping addresses by user ID
export const getShippingAddressesByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const shippingAddresses = await ShippingDetails.find({ userId });
      if (shippingAddresses.length === 0) {
        return res.status(404).json({ error: true, message: "No shipping addresses found for this user" });
      }
      res.status(200).json(shippingAddresses);
    } catch (error) {
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  };

  export const getSingleShippingAddressesByUserId = async (req, res) => {
    try {
      const { addressId } = req.params;
      const shippingAddresses = await ShippingDetails.find({ _id: addressId});
      if (shippingAddresses.length === 0) {
        return res.status(404).json({ error: true, message: "No shipping addresses found for this user" });
      }
      res.status(200).json(shippingAddresses);
    } catch (error) {
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  };

  
  // Controller for updating a shipping address by user ID and address ID
  export const updateShippingAddressByUserId = async (req, res) => {
    try {
      const { addressId } = req.params;
      const updatedShippingAddress = await ShippingDetails.findOneAndUpdate(
        { _id: addressId },
        req.body,
        { new: true }
      );
      if (!updatedShippingAddress) {
        return res.status(404).json({ error: true, message: "Shipping address not found for this user" });
      }
      res.status(200).json(updatedShippingAddress);
    } catch (error) {
      res.status(400).json({ error: true, message: error.message });
    }
  };

  
  
  // Controller for deleting a shipping address by user ID and address ID
  export const deleteShippingAddressByUserId = async (req, res) => {
    try {
      const { addressId } = req.params;
      const deletedShippingAddress = await ShippingDetails.findOneAndDelete({ _id: addressId });
      if (!deletedShippingAddress) {
        return res.status(404).json({ error: true, message: "Shipping address not found for this user" });
      }
      res.status(200).json({ message: "Shipping address deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: true, message: error.message });
    }
  };
  