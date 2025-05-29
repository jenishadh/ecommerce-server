import * as Error from '../lib/api-error';
import { uploadOnCloudinary } from '../lib/cloudinary';

export async function uploadImage(filePath: string) {
  const uploadedImage = await uploadOnCloudinary(filePath);
  if (!uploadedImage) {
    throw new Error.InternalError(
      'Image upload failed. Please try again later.'
    );
  }
  return uploadedImage;
}
