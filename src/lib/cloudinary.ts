import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

import { cloudinaryConfig } from '../config';

cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecret,
});

export async function uploadOnCloudinary(localFilePath: string) {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'image',
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch {
    fs.unlinkSync(localFilePath);
    return null;
  }
}
