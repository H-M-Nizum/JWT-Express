require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1]; // Extract the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userName = decoded.userName;
    req.userId = decoded.userId;

    next(); // Pass control to the next middleware
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
      error: error.message,
    });
  }
};

module.exports = checkLogin;
