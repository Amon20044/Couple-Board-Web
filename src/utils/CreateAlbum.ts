import axios from 'axios';
import imgBBuploader from './imgBB';
// Update the parameter type to match Multer's file type
const url= import.meta.env.VITE_BACKEND_URI_DEV;
async function CreateAlbum(name: string, description: string, images: File[]) {
    const token = localStorage.getItem("token") || "";
    
    if (images.length === 0) {
        throw new Error("Please select at least one image!");
    }
    
    if (!name) name = "Our Love Album";
    
    // Pass the buffer and mimetype instead of the file object
    const link : string = await imgBBuploader(images[0]);
    const formData = new FormData();
    formData.append("album_name", name);
    formData.append("description", description);
    formData.append("cover_url", link);
    console.log("name: "+name);
    console.log("description: "+description);
    console.log("link: "+link);
    try {
        const response = await axios.post(
            `${url}/api/albums/create`,
            {
                album_name: name,
                description: description,
                cover_url: link
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response.data.album[0].id);
            
        return {
            albumId: response.data.album[0].id,
            message: "Album created successfully!"
        };
    } catch (error) {
        console.error("Album creation failed:", error);
        throw error;
    }
}

export default CreateAlbum;