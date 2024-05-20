const express = require("express");
const router = express.Router();
const RawMaterial = require("../models/RawMaterial");

// Get all raw materials
router.get("/", async (req, res) => {
    try {
        const rawMaterials = await RawMaterial.find();
        res.json(rawMaterials);
    } catch (error) {
        console.error('Error fetching raw materials:', error);
        res.status(500).json({ error: 'Failed to fetch raw materials' });
    }
});

// Add raw material
router.post("/add", async (req, res) => {
    try {
        const { itemId, rawMaterialName, quantity, value, expiredDate, manufacturedDate,ROL } = req.body;

        // Check if itemId already exists in the database
        const existingMaterial = await RawMaterial.findOne({ item_id: itemId });
        if (existingMaterial) {
            return res.status(400).json({ error: "Item ID already exists" });
        }

        const newRawMaterial = new RawMaterial({
            item_id: itemId,
            RawMaterial_name: rawMaterialName,
            Quantity: quantity,
            value: value,
            Expired_date: expiredDate,
            Manufactured_Date: manufacturedDate,
            ROL:ROL
        
        });
        await newRawMaterial.save();
        res.json("Raw material added");
    } catch (error) {
        console.error('Error adding raw material:', error);
        res.status(500).json({ error: 'Failed to add raw material' });
    }
});

// Update raw material
router.put("/update/:id", async (req, res) => {
    try {
        const rawMaterialId = req.params.id;
        const { itemId, rawMaterialName, quantity, value, expiredDate, manufacturedDate,ROL } = req.body;
        const updatedRawMaterial = {
            item_id: itemId,
            RawMaterial_name: rawMaterialName,
            Quantity: quantity,
            value: value,
            Expired_date: expiredDate,
            Manufactured_Date: manufacturedDate,
            ROL:ROL
        };
        const result = await RawMaterial.findByIdAndUpdate(rawMaterialId, updatedRawMaterial, { new: true });
        res.json({ status: "Raw material updated", rawMaterial: result });
    } catch (error) {
        console.error('Error updating raw material:', error);
        res.status(500).json({ error: 'Failed to update raw material' });
    }
});

// Delete raw material
router.delete("/delete/:id", async (req, res) => {
    try {
        const rawMaterialId = req.params.id;
        await RawMaterial.findByIdAndDelete(rawMaterialId);
        res.json({ status: "Raw material deleted" });
    } catch (error) {
        console.error('Error deleting raw material:', error);
        res.status(500).json({ error: 'Failed to delete raw material' });
    }
});

// Get raw material by ID
router.get("/get/:id", async (req, res) => {
    try {
        const rawMaterialId = req.params.id;
        const rawMaterial = await RawMaterial.findById(rawMaterialId);
        if (!rawMaterial) {
            return res.status(404).json({ error: 'Raw material not found' });
        }
        res.json(rawMaterial);
    } catch (error) {
        console.error('Error fetching raw material:', error);
        res.status(500).json({ error: 'Failed to fetch raw material' });
    }
});

module.exports = router;
