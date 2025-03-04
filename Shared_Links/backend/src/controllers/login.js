// controllers/login.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Generate a token for the newly created user
    // const token = generateToken(newUser);

    res.status(201).json({
      // token,
      // user: {
      //   id: newUser._id,
      //   email: newUser.email,
      // },
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Failed to create user." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking that email and password  is not missing
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // checking that email exists in database or not !
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    // matching password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const tokenData = {
      userId: user._id, // Payload for the JWT: contains the user's ID
    };

    let token;
    try {
      token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      console.log(token);
    } catch (err) {
      console.error("JWT signing error:", err);
      return res.status(500).json({ message: "Authentication error" });
    }

    // Restructure the user object to send only necessary data to the client
    // user = { _id: user._id, fullname: user.fullname };
    // console.log(user);
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // Cookie expires in 1 day (matches JWT expiration)
        httpOnly: true, // Cookie is accessible only by the server (not by client-side JavaScript)
        // sameSite: strict, // Cookie is sent only for same-site requests
      })
      .json({
        message: `Welcome back ! ${user.fullname}`,
        success: true,
        token,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only for HTTPS in production
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { signup, login, logout };
