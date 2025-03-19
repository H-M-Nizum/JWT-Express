const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log("MongoDB connection Error: ", error);
    process.exit(1); // Stop the app if DB connection fails
  }
};

module.exports = connectDB;
