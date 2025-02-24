// controllers/login.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    user = new User({ email, password });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, password });
      await user.save();
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { login, signup, logout };
