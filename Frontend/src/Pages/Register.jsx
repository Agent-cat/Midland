import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phno, setPhno] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phno", phno);
    formData.append("profilePicture", profilePicture);

    try {
      const cloudinaryResponse = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(cloudinaryResponse);

      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username,
          email,
          password,
          phno: parseInt(phno),
          profilePicture:
            cloudinaryResponse.data.secure_url ||
            "https://imgs.search.brave.com/jm5UP6r8PnjZnT5e-qJcZH4eSpg922A4sc4UqCQoz5c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvZGVmYXVsdC11/c2VyLXByb2ZpbGUt/dmVjdG9yLWlsbHVz/dHJhdGlvbl82NjQ5/OTUtMzM0LmpwZz9z/aXplPTYyNiZleHQ9/anBn",
          isLoggedIn: false,
          recentlyViewed: [],
        }
      );

      const userData = response.data;
      console.log("Registration successful:", userData);
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred during registration"
      );
    }
  };

  return (
    <div className=" p-4 rounded-xl   max-w-sm mx-auto mt-24">
      <h2 className="text-red-600 text-2xl font-bold text-center mb-4">
        Register
      </h2>
      {error && (
        <p className="text-red-500 text-center mb-2 text-sm">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-red-600 mb-1 text-md font-medium"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
            maxLength={20}
            className="w-full px-3 py-2 text-md border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 bg-white text-gray-800"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-red-600 mb-1 text-md font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={50}
            className="w-full px-3 py-2 text-md border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 bg-white text-gray-800"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-red-600 mb-1 text-md font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-3 py-2 text-md border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 bg-white text-gray-800"
          />
        </div>
        <div>
          <label
            htmlFor="phno"
            className="block text-red-600 mb-1 text-md font-medium"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phno"
            value={phno}
            onChange={(e) => setPhno(e.target.value)}
            required
            className="w-full px-3 py-2 text-md border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 bg-white text-gray-800"
          />
        </div>
        <div>
          <label
            htmlFor="profilePicture"
            className="block text-red-600 mb-1 text-md font-medium"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full px-3 py-2 text-md border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 bg-white text-gray-800"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 -tracking-wider text-white py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 text-sm font-bold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
