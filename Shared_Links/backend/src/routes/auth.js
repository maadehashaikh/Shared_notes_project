const express = require("express");
const { login, signup, logout } = require("../controllers/login");

const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.post("/signup", signup);
authRoutes.post("/logout", logout);

module.exports = authRoutes;
