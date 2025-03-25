import axios from 'axios';

async function CreateAlbum(name: string, description: string, images: File[]) {
    const token = localStorage.getItem("token") || "";
    if (images.length === 0) {
        throw new Error("Please select at least one image!");
    }
    if (!name) name = "Our Love Album";

    const formData = new FormData();
    formData.append("album_name", name);
    formData.append("description", description);
    formData.append("images", images[0]);

    try {
        const response = await axios.post(
            `/api/albums/create`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response.data.album[0].id)
            
        return {
            albumId: response.data.album[0].id, // Adjust this based on your API response structure
            message: "Album created successfully!"
        };
    } catch (error) {
        console.error("Album creation failed:", error);
        throw error;
    }
}

export default CreateAlbum;
