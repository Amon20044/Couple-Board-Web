import { useState, useEffect } from "react";
import axios from "axios";

function Images() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const url: string = import.meta.env.VITE_BACKEND_URI;

    useEffect(() => {
        if (!userId || !token) {
            console.error("Missing userId or token");
            return;
        }

        console.log("Fetching images for user:", userId);

        const fetchImages = async () => {
            try {
                const response = await axios.get(`${url}/media/images/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("API Response:", response.data.media.data[0].media_url); // Debug response

                setImages(response.data.media.data || []); // Ensure correct response structure
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [userId, token]);

    return (
        <div className="p-4">
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : images.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {images.map((image: any) => (
                        <img
                            key={image.id}
                            src={image.media_url}
                            alt={`Image ${image.id}`}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No images found</p>
            )}
        </div>
    );
}

export default Images;
