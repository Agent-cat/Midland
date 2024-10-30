import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Image,
  Map,
  X,
  Bed,
  Bath,
  Home,
  ChefHat,
  Maximize,
  ShoppingCart,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const PropertyDetails = ({ properties }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showPhotos, setShowPhotos] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.propertyData) {
      setPropertyData(location.state.propertyData);
    } else {
      const property = properties.find((p) => p._id === id);
      if (property) {
        setPropertyData(property);
      } else {
        navigate("/buy");
      }
    }
  }, [id, location, navigate, properties]);

  if (!propertyData) {
    return <div>Loading...</div>;
  }

  const {
    name,
    location: propertyLocation,
    price,
    saleOrRent,
    images,
    address,
    ownerName,
    bhk,
    sqft,
    overview,
    amenities,
    details,
    locationMap,
    kitchen,
    bathroom,
  } = propertyData;

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    if (activeTab === "overview") {
      return <p className="text-gray-700">{overview}</p>;
    } else if (activeTab === "details") {
      return (
        <div>
          <p>BHK: {bhk}</p>
          <p>Sqft: {sqft}</p>
          <p>Owner: {ownerName}</p>
          {details && <p>{details}</p>}
        </div>
      );
    } else if (activeTab === "amenities") {
      return (
        <ul className="list-disc list-inside">
          {amenities.map((amenity, index) => (
            <li key={index} className="text-gray-700">
              {amenity}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleAddToCart = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:4000/api/properties/cart/add", {
        userId: userData._id,
        propertyId: propertyData._id,
      });
      setIsInCart(true);
      setLoading(false);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setLoading(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: name,
    description: overview,
    price: price,
    address: {
      "@type": "PostalAddress",
      addressLocality: address,
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <Helmet>
        <title>{name} | Midland Real Estate</title>
        <meta
          name="description"
          content={`${bhk} BHK ${saleOrRent} for ${price.toLocaleString()} in ${address}. ${overview}`}
        />
        <meta
          name="keywords"
          content={`${bhk} BHK, ${saleOrRent}, ${price.toLocaleString()}, ${address}, ${overview}`}
        />
        <meta property="og:title" content={`${name} | Midland Real Estate`} />
        <meta
          property="og:description"
          content={`${bhk} BHK ${saleOrRent} for ${price.toLocaleString()} in ${address}`}
        />
        <meta property="og:image" content={images[0]} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="cursor-auto select-none font-['Onest',sans-serif]">
        <div className="w-full overflow-y-auto mt-20 h-full p-4 rounded-2xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-1 flex items-center text-red-600 hover:underline"
          >
            <ChevronLeft className="mr-2" />
            <div className="px-2 py-1 rounded-md bg-red-600 text-white">
              Back
            </div>
          </button>
          <div className="rounded-lg p-3">
            <div className="flex justify-center space-x-4 mb-6">
              <button
                className={`flex items-center px-4 py-2 rounded-full ${
                  showPhotos
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setShowPhotos(true)}
              >
                <Image className="mr-2" /> Photos
              </button>
              <button
                className={`flex items-center px-4 py-2 rounded-full ${
                  !showPhotos
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setShowPhotos(false)}
              >
                <Map className="mr-2" /> Map
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="relative mb-6 rounded-xl w-full h-[400px] md:h-[calc(100vh-300px)]">
                  {showPhotos ? (
                    <>
                      <img
                        src={images[currentImageIndex]}
                        alt={`${name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
                        onClick={toggleFullScreen}
                      />
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-500 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300"
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-500 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300"
                      >
                        <ChevronRight />
                      </button>
                    </>
                  ) : (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.4200262163104!2d80.62001967522313!3d16.441925684292904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0a2a7d81943%3A0x8ba5d78f65df94b8!2sK%20L%20E%20F%20Deemed%20To%20Be%20University!5e1!3m2!1sen!2sin!4v1729451108838!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="eager"
                      className="rounded-xl h-[400px]  md:h-[calc(100vh-240px)]"
                    ></iframe>
                  )}
                </div>
                {showPhotos && (
                  <div className="flex space-x-4 mb-6 ">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${name} - Image ${index + 1}`}
                        className={`w-24 h-24 object-cover rounded-xl cursor-pointer transition-all duration-300 ${
                          index === currentImageIndex
                            ? "border-2 border-red-500 scale-105"
                            : "opacity-70 hover:opacity-100"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-0 text-gray-800">
                    {name}
                  </h2>
                  <p className="text-2xl md:text-3xl text-red-600 font-bold">
                    ₹{price.toLocaleString()}
                    {saleOrRent === "rent" ? "/month" : ""}
                  </p>
                </div>
                <p className="text-gray-600 flex items-center mb-6">
                  <MapPin className="mr-2" /> {address}
                </p>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Property Details:
                  </h3>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center">
                      <Bed className="mr-2 text-red-600" />
                      <span>{bhk} Bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="mr-2 text-red-600" />
                      <span>{bathroom} Bathrooms</span>
                    </div>
                    <div className="flex items-center">
                      <ChefHat className="mr-2 text-red-600" />
                      <span>{kitchen} Kitchen</span>
                    </div>
                    <div className="flex items-center">
                      <Maximize className="mr-2 text-red-600" />
                      <span>{sqft} sqft</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-6 mb-4 border-b border-gray-200">
                    {["overview", "details", "amenities"].map((tab) => (
                      <span
                        key={tab}
                        className={`text-lg font-medium cursor-pointer pb-2 ${
                          activeTab === tab
                            ? "text-red-600 border-b-2 border-red-600"
                            : "text-gray-600 hover:text-red-500"
                        }`}
                        onClick={() => handleTabChange(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </span>
                    ))}
                  </div>
                  <div className="h-[200px] overflow-y-auto transition-all duration-300 ease-in-out mb-6">
                    {renderTabContent()}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
                    <button className="px-6 py-3 bg-white text-gray-800 border-2 border-gray-200 rounded-full hover:bg-gray-100 hover:border-gray-300 transition-colors duration-300">
                      Contact Agent
                    </button>
                    <button
                      onClick={handleAddToCart}
                      disabled={loading || isInCart}
                      className={`px-8 py-3 flex items-center justify-center gap-2 rounded-full transition-colors duration-300 ${
                        isInCart
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white`}
                    >
                      <ShoppingCart size={20} />
                      {isInCart ? "In Cart" : "Add to Cart"}
                    </button>
                    <button className="px-8 py-3 bg-red-500 text-white border rounded-full hover:bg-red-600 transition-colors duration-300">
                      {saleOrRent === "rent" ? "Rent Now" : "Buy Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isFullScreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={toggleFullScreen}
          >
            <div
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentImageIndex]}
                alt={`${name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain rounded-2xl"
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-500 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-500 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300"
              >
                <ChevronRight />
              </button>
              <button
                onClick={toggleFullScreen}
                className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-2"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyDetails;
