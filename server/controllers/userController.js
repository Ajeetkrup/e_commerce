const User = require("../models/user");
const { generatePresignedUrlForUpload, generatePresignedUrl } = require("../utils/awsBucket");

// upload user profile picture
exports.uploadProfilePicture = async (req, res) => {
  const {key, fileType} = req.body;
  try {
    const userId = req.user.id;
    const urlToUploadInAwsBucket = await generatePresignedUrlForUpload(key, fileType);
    await User.findByIdAndUpdate(
      userId,
      { profilePictureKey: `uploads/ecommerce/users/${key}` },
      { new: true }
    );
    res.json({ message: "Presigned url generated successfully", urlToUploadInAwsBucket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    console.log("API call starts");
    const user = await User.findById(req.user.id).select("-password"); // Exclude password from the response
    const profileUrl = await generatePresignedUrl(user.profilePictureKey);
    console.log("user - ", user);
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log("API call ends");
    res.send({...user?._doc, profileUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
