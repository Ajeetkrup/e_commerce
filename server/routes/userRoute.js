const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getProfile,
  uploadProfilePicture,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

const upload = multer({
  dest: "uploads/",
});

router.get("/profile", verifyToken, getProfile); // New route for getting user profile
// upload profile picture route
router.post(
  "/upload-profile-picture",
  verifyToken,
  uploadProfilePicture
);

module.exports = router;    
