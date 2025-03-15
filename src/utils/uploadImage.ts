import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URI; // Ensure this is set in your environment variables

export const uploadImages = async (albumId: string, images: File[]) => {
  if (images.length === 0) {
    alert("Please select at least one image!");
    return;
  }

  const formData = new FormData();
  images.forEach(image => formData.append("images", image));
  formData.append("albumId", albumId);

  try {
    const token = localStorage.getItem("token"); // Ensure token exists in localStorage
    const response = await axios.post(`${backendURL}/media/upload/${albumId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
