import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sell = ({ refreshProperties }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "flats",
    sqft: "",
    location: "vijayawada",
    bhk: "",
    address: "",
    ownerName: "",
    saleOrRent: "sale",
    price: "",
    details: "",
    dimensions: "",
    overview: "",
    amenities: [],
    locationMap: "",
    bedroom: 0,
    bathroom: 0,
    kitchen: 0,
  });
  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenitiesChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      amenities: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "midland_property");

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/vishnu2005/image/upload`,
          formData
        );
        return response.data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error uploading images");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData = {
        ...formData,
        images: images,
      };

      const response = await axios.post(
        "http://localhost:4000/api/properties",
        propertyData
      );
      if (response.status === 201) {
        refreshProperties();
        alert("Property listed successfully!");
        navigate("/buy");
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      alert("Error submitting property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-24 p-8 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-500 font-['Onest',sans-serif]">
        List Your Property
      </h1>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-red-500">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-700">
                  Property Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Property Type*
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  required
                >
                  <option value="flats">Flats</option>
                  <option value="houses">Houses</option>
                  <option value="villas">Villas</option>
                  <option value="shops">Shops</option>
                  <option value="agriculture land">Agriculture Land</option>
                  <option value="residential land">Residential Land</option>
                  <option value="farmhouse">Farmhouse</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Square Feet*</label>
                <input
                  type="number"
                  name="sqft"
                  value={formData.sqft}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Location*</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  required
                >
                  <option value="vijayawada">Vijayawada</option>
                  <option value="amravathi">Amravathi</option>
                  <option value="guntur">Guntur</option>
                </select>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-red-500">
              Property Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-700">BHK*</label>
                <input
                  type="number"
                  name="bhk"
                  value={formData.bhk}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Owner Name*</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Listing Type*
                </label>
                <select
                  name="saleOrRent"
                  value={formData.saleOrRent}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  required
                >
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Price*</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* Room Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-red-500">
              Room Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-700">Bedrooms</label>
                <input
                  type="number"
                  name="bedroom"
                  value={formData.bedroom}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  min="0"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Bathrooms</label>
                <input
                  type="number"
                  name="bathroom"
                  value={formData.bathroom}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  min="0"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Kitchens</label>
                <input
                  type="number"
                  name="kitchen"
                  value={formData.kitchen}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-red-500">
              Additional Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-700">
                  Full Address*
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  rows="2"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Property Details
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  rows="3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-red-500">
            Property Specifications
          </h2>

          <div>
            <label className="block mb-1 text-gray-700">Dimensions</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
              placeholder="e.g., 30x40"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Overview</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
              rows="3"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">
              Amenities (comma-separated)
            </label>
            <textarea
              name="amenities"
              value={formData.amenities.join(", ")}
              onChange={handleAmenitiesChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
              rows="2"
              placeholder="e.g., Swimming Pool, Gym, Garden"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">
              Location Map Link
            </label>
            <input
              type="text"
              name="locationMap"
              value={formData.locationMap}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
              placeholder="Google Maps URL"
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-red-500">
            Property Images
          </h2>
          <div className="space-y-4">
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 focus:border-red-400"
              accept="image/*"
            />

            <div className="flex gap-4 flex-wrap">
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Property ${index + 1}`}
                  className="w-24 h-24 object-cover rounded shadow-sm"
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 disabled:bg-gray-400 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          {loading ? "Submitting..." : "List Property"}
        </button>
      </form>
    </div>
  );
};

export default Sell;
