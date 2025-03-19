const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

const saltRounds = parseInt(process.env.SALTROUNDS);

router.post("/signup", async (req, res) => {
  const { fullName, userName, email, password } = req.body;

  if (!fullName || !userName || !email || !password) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Password encription
    const hasPass = await bcrypt.hash(password, saltRounds);
    const newUser = new UserModel({
      fullName,
      userName,
      email,
      password: hasPass,
    });
    await newUser.save();

    newUser.password = "";
    res
      .status(201)
      .json({ success: true, message: "User created successfully", newUser });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating user", error });
  }
});

module.exports = router;
