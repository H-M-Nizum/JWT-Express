const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const saltRounds = parseInt(process.env.SALTROUNDS);

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;

    // Validate all required fields
    if (!fullName || !userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this username or email already exists",
      });
    }

    // Password encryption
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new UserModel({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Remove password before sending response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(401).json({
        error: "Authentication failed",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Authentication failed",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userName: user.userName, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      access_token: token,
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
