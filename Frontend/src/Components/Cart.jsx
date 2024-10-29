import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Trash2 } from "lucide-react";

const Cart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (isOpen && userData) {
      fetchCartItems();
    }
  }, [isOpen]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/properties/cart/${userData._id}`
      );
      setCartItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (propertyId) => {
    try {
      await axios.post("http://localhost:4000/api/properties/cart/remove", {
        userId: userData._id,
        propertyId,
      });
      setCartItems(cartItems.filter((item) => item._id !== propertyId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : cartItems.length === 0 ? (
            <div className="text-center text-gray-500">Your cart is empty</div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 mb-4 p-4 border rounded-lg"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.location}</p>
                    <p className="text-red-500 font-bold">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

              <div className="mt-8 border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">
                    ₹{calculateTotal().toLocaleString()}
                  </span>
                </div>
                <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-300">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
