const asyncHandler = require("express-async-handler");
const User = require("../Models/user.model.js");
const generateToken = require("../config/generateToken.js");
const bcrypt = require("bcryptjs");

const signup = asyncHandler(async (req, res) => {
  const { username, email, password, phno, role, isLoggedIn, profilePicture } =
    req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide username, email, and password" });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res
      .status(409)
      .json({ error: "User already exists with that email" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    phno,
    role,
    isLoggedIn,
    profilePicture,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      pic: user.profilePicture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ error: "Failed to create user" });
  }
});

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      pic: user.profilePicture,
      role: user.role,
      viewedProperties: user.viewedProperties,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

module.exports = { signup, signin };
