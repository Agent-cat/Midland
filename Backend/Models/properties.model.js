const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, unique: true },
  type: {
    type: String,
    enum: [
      "flats",
      "houses",
      "villas",
      "shops",
      "agriculture land",
      "residential land",
      "farmhouse",
    ],
    required: true,
  },
  sqft: { type: Number, required: true },
  location: {
    type: String,
    enum: ["vijayawada", "amravathi", "guntur"],
    required: true,
  },
  bhk: {
    type: Number,
    required: true,
  },
  isFavourite: { type: Boolean, default: false },
  address: { type: String, required: true },
  ownerName: { type: String, required: true },
  saleOrRent: {
    type: String,
    enum: ["sale", "rent"],
    required: true,
  },
  price: { type: Number, required: true },
  details: { type: String },
  dimensions: { type: String },
  images: { type: [String] },
  overview: { type: String },
  amenities: { type: [String] },
  locationMap: { type: String },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
