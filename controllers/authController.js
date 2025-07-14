// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const exUser = await User.findOne({ email });
  if (exUser) return res.status(400).send("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashed });

  res.status(201).send("User registered");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const exUser = await User.findOne({ email });
  if (!exUser) return res.status(400).send("Invalid credentials");

  const isMatch = await bcrypt.compare(password, exUser.password);
  if (!isMatch) return res.status(400).send("Wrong password");

  const token = jwt.sign({ userId: exUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
};
