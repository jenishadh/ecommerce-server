import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

import * as Config from '../config';

cloudinary.config({
  cloud_name: Config.cloudinary.cloudName,
  api_key: Config.cloudinary.apiKey,
  api_secret: Config.cloudinary.apiSecret,
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
