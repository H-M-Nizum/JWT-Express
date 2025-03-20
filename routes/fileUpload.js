const express = require("express");
const router = express.Router();
const multer = require("multer");

// upload a single file
const UPLOADS_FOLDER = "./uploads/";
let upload = multer({
  dest: UPLOADS_FOLDER,
  limits: {
    fileSize: 1000000, //1MB // Maximum 1MB file allow
  },
  // Restriction for file extention
  fileFilter: (req, file, cb) => {
    console.log(file);
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg, .png format allowed!"), false);
    }
  },
});

router.post("/", upload.single("avatar"), (req, res) => {
  res.send({ success: true, message: "Hello, Express!" });
});

// Upload Multiple file
router.post("/multiple", upload.array("avatar1", 2), (req, res) => {
  res.send({ success: true, message: "Hello, Express! multiple" });
});

// Upload multiple file from multiple field
router.post(
  "/files",
  upload.fields([
    { name: "avatar2", maxCount: 1 },
    { name: "gallery", maxCount: 2 },
  ]),
  (req, res) => {
    res.send({
      success: true,
      message: "Hello, Express! multiple file from multiple field",
    });
  }
);

module.exports = router;
