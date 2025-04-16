import axios from "axios";

const url= import.meta.env.VITE_BACKEND_URI_DEV;
export const uploadImages = async (albumId: string, urls : string[]) => {
  
  try {
    console.log("Uploading images to server...", urls);
    
    const token = localStorage.getItem("token"); // Ensure token exists in localStorage
    const response = await axios.post(`${url}/api/media/upload/${albumId}`, urls, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Upload successful:", response.data);
    alert("Images uploaded successfully!");
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Image upload failed!");
    throw error;
  }
};
