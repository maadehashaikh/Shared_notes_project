const express = require("express")
const { login } = require("../controllers/login")
const authRoutes = express()

authRoutes.post("/login", login)

module.exports = authRoutes

