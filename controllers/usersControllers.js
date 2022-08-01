const User = require("../models/UserModel");
// const mongoose = require("mongoose");

// Login User
const login = async (req, res) => {
  res.json({ msg: "login user" });
};

// Signup User
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signupUser(name, email, password);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  signup,
};
