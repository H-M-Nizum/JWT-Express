// Global looger middleware
const logger = (req, res, next) => {
  console.log(
    `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
      req.originalUrl
    } - ${req.protocol} - ${req.ip}`
  );
  next();
};

module.exports = logger;
