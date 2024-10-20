const Property = require("../Models/properties.model");

const postproperty = async (req, res) => {
  // Create a new property
  try {
    const existingProperty = await Property.findOne({
      name: req.body.name,
      location: req.body.location,
      address: req.body.address,
    });
    if (existingProperty) {
      return res.status(409).json({ message: "Property already exists" });
    }
    const highestProperty = await Property.findOne().sort("-id").exec();
    const nextId = highestProperty ? parseInt(highestProperty.id) + 1 : 1;
    const propertyData = {
      ...req.body,
      id: nextId.toString(),
    };
    const property = new Property(propertyData);
    const savedProperty = await property.save();
    res.status(201).json({
      message: "Property created successfully",
      property: savedProperty,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getallproperties = async (req, res) => {
  // Get all properties
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { postproperty, getallproperties };
