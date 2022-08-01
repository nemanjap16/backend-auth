const User = require("../models/UserModel");
// const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.loginUser(email, password);
    // create a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup User
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signupUser(name, email, password);
    // create a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  signup,
};
