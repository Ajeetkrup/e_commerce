const { S3Client, GetObjectCommand , PutObjectCommand} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");
const { contentType, get } = require("express/lib/response");
dotenv.config();

console.log("rocess.env.AWS_Bucket_Name", process.env.AWS_BUCKET_NAME);
// Create an S3 client
const client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Generate a pre-signed URL for a file
exports.generatePresignedUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });
  try {
    const url = await getSignedUrl(client, command, { expiresIn: 600 });
    return url;
  } catch (err) {
    console.error("Error generating pre-signed URL", err);
  }
};

// Generate a pre-signed URL for a file for upload
exports.generatePresignedUrlForUpload = async (key, fileType) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/ecommerce/users/${key}`,
    contentType: fileType,
  });
  
  try {
      const url = await getSignedUrl(client, command, { expiresIn: 600 });
      return url;
  } catch (error) {
      throw error;
  }
}
