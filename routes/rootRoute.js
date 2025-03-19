const express = require("express");
const checkLogin = require("../middlewares/checklogin");
const router = express.Router();

router.get("/", checkLogin, (req, res) => {
  res.send({ success: true, message: "Hello, Express!" });
});

module.exports = router;
