const express = require("express");
const connectDB = require("./config");
require("dotenv").config();
// import Router
const rootRouter = require("./routes/rootRoute");
const userRouter = require("./routes/userRouter");

const PORT = process.env.PORT || 5000;

// Initial Express App
const app = express();

// Connect to the databse
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Application Routes
app.use("/", rootRouter);
app.use("/user", userRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is Runnign on http://localhost:${PORT}`);
});
