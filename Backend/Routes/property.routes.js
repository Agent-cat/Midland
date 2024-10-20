const express = require("express");
const Property = require("../Models/properties.model.js");
const router = express.Router();
const {
  postproperty,
  getallproperties,
} = require("../controllers/property.controller.js");

router.post("/", postproperty);
router.get("/", getallproperties);

// Get a property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findOne({ id: req.params.id });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a property by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedProperty = await Property.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(updatedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a property by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProperty = await Property.findOneAndDelete({
      id: req.params.id,
    });
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
