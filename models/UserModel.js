const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

// custom static signup method
userSchema.statics.signupUser = async function (name, email, password) {
  // validation
  if (!name || !email || !password) {
    throw Error("All fields must be filled.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough.");
  }
  // check is email already exist
  const existEmail = await this.findOne({ email });
  if (existEmail) {
    throw Error("Email already in use.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hashPassword });

  return user;
};

// custom static signin method
userSchema.statics.loginUser = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }
  // check is user with provided email exist
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User with provided email do not exist.");
  }
  // match credentials
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
