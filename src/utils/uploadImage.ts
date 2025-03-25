import axios from "axios";

export const uploadImages = async (albumId: string, formData: FormData) => {
  if (!formData.has("images")) {
    alert("Please select at least one image!");
    return;
  }

  try {
    const token = localStorage.getItem("token"); // Ensure token exists in localStorage
    const response = await axios.post(`/api/media/upload/${albumId}`, formData, {
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
