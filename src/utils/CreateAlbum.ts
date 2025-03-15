import axios from 'axios';

const urlb: string = import.meta.env.VITE_BACKEND_URI;

async function CreateAlbum(name: string, url: string) {
    const token = localStorage.getItem("token") || ""; // ✅ Get token

    const urls: string[] = [
        "https://i.postimg.cc/DyKPDYXm/98143a7a446a4184b30f2ecc5c92e5d6-H3000-W3000-320-320.jpg",
        "https://i.postimg.cc/SxgLnStz/ab67616d0000b273f44664b37efaec6336a27938.jpg",
        "https://i.postimg.cc/7LcgNB4H/ab67616d00001e02554015e74651071989346441.jpg"
    ];

    if (!name) name = "Love Album";
    if (!url) url = urls[Math.floor(Math.random() * urls.length)];

    try {
        const response = await axios.post(
            `${urlb}/albums/create`,
            {
                album_name: name,
                cover_url: url
            },
            {
                headers: {
                    Authorization: `Bearer ${token}` // ✅ Add Auth Token
                }
            }
        );

        console.log("Album created successfully");
        return response.data;
    } catch (error) {
        console.error("Album creation failed:", error);
        throw error;
    }
}

export default CreateAlbum;
