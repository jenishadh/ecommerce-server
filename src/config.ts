export const port = process.env.PORT || 8000;

export const tokenConfig = {
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  accessExpiry: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN!),
  refreshSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshExpiry: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN!),
};

export const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};
