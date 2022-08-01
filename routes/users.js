const { login, signup } = require("../controllers/usersControllers");

const router = require("express").Router();

// Login
router.post("/login", login);

// Sign Up
router.post("/signup", signup);

module.exports = router;
