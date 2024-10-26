const Property = require("../Models/properties.model");
const asyncHandler = require("express-async-handler");

const postproperty = asyncHandler(async (req, res) => {
  const existingProperty = await Property.findOne({
    name: req.body.name,
    location: req.body.location,
    address: req.body.address,
  });

  if (existingProperty) {
    res.status(409);
    throw new Error("Property already exists");
  }

  const highestProperty = await Property.findOne().sort("-id").exec();
  const nextId = highestProperty ? parseInt(highestProperty.id) + 1 : 1;

  const propertyData = {
    ...req.body,
    id: nextId,
  };

  const property = await Property.create(propertyData);

  if (property) {
    res.status(201).json({
      message: "Property created successfully",
      property: property,
    });
  } else {
    res.status(400);
    throw new Error("Invalid property data");
  }
});

const getallproperties = asyncHandler(async (req, res) => {
  const properties = await Property.find();
  res.status(200).json(properties);
});

const updateproperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  const updatedProperty = await Property.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    message: "Property updated successfully",
    property: updatedProperty,
  });
});

const deleteproperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  await property.remove();
  res.status(200).json({ message: "Property deleted successfully" });
});

const getpropertybyid = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  res.status(200).json(property);
});

module.exports = {
  postproperty,
  getallproperties,
  updateproperty,
  deleteproperty,
  getpropertybyid,
};
