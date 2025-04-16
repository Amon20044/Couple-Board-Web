import axios from "axios";
import { blobToWebP } from 'webp-converter-browser'
const API_KEY: string = import.meta.env.VITE_IMAGEBB_KEY;

/**
 * Uploads an image to ImgBB and returns the URL
 * @param img - File containing the image data
 * @returns Promise with the uploaded image URL
 */
export default async function imgBBuploader(img: File): Promise<string> {
  if (!API_KEY) {
    throw new Error("ImgBB API key not found in environment variables");
  }

  try {
    const formData = new FormData();
    const webp = await blobToWebP(img, { quality: 60 });
    // If webpBuffer is null (GIF, video), use the original file
    formData.append("image", img);
    console.log(webp)
    console.log(API_KEY)
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    
    if (response.data && response.data.data && response.data.data.url){
      console.log("Image uploaded successfully:", response.data.data.url);
      return response.data.data.url;
    } else {
      throw new Error("Invalid response from ImgBB API");
    }
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    throw error;
  }
}