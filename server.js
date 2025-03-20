const express = require("express");
const connectDB = require("./config");
require("dotenv").config();
const rootRouter = require("./routes/rootRoute");
const userRouter = require("./routes/userRouter");
const logger = require("./middlewares/logger");
const globalErrorHandeler = require("./middlewares/global-error-handeler");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

// Initial Express App
const app = express();

// Connect to the databse
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Cors
const allowedOrigins = [
  "http://127.0.0.1:5500", // Local development
  "http://localhost:3000", // Example: React frontend
  "https://your-production-site.com", // Production domain
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies and authentication headers
  })
);

// Global custom Middleware
app.use(logger);
app.use(globalErrorHandeler);

// Application Routes
app.use("/", rootRouter);
app.use("/user", userRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is Runnign on http://localhost:${PORT}`);
});
