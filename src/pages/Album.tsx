import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageUpload from "../ui/ImageUpload";

type Media = {
  id: string;
  album_id: string;
  media_url: string;
  media_type: string;
  uploaded_at: string;
};

const Album = () => {
  const { album_id } = useParams<{ album_id: string }>(); // ✅ Extract album_id
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");

  const url: string = import.meta.env.VITE_BACKEND_URI;

  // ✅ Fetch auth token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    else console.error("No auth token found");
  }, []);

  // ✅ Fetch media only if album_id and token exist
  useEffect(() => {
    if (!album_id || !token) return;

    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${url}/media/${album_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMedia(response.data.media || []);
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [album_id, token]);

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Album: {album_id}</h1>

      {/* ✅ Image Upload Section */}
      <ImageUpload albumId={album_id || ""} />

      {/* ✅ Media List Section */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : media.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mt-6">
          {media.map((item) => (
            <div key={item.id} className="relative w-40 h-40">
              <img
                src={item.media_url}
                alt={`Media ${item.id}`}
                className="object-cover w-full h-full rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No media found</p>
      )}
    </div>
  );
};

export default Album;
