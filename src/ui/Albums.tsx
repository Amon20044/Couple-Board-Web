import { useState, useEffect } from "react";
import axios from "axios";
import SkeletonLoader from "./SkeletonLoader";
import { useNavigate } from "react-router-dom"; 
interface Album {
  id: string;
  album_name: string;
  cover_url: string;
}

function Albums() {
    const [albums, setAlbums] = useState<Album[]>([]); // Fix: Change to an array
    const [userID, setUserID] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const navigate = useNavigate(); 
  
  const url : string = import.meta.env.VITE_BACKEND_URI
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    const storedUserID = localStorage.getItem("userId") || "";

    if (!storedToken || !storedUserID) {
      console.error("No auth token or userId found");
      return;
    }

    setToken(storedToken);
    setUserID(storedUserID);
  }, []);
  
  // Fetch albums once userID is available
  useEffect(() => {
    if (!userID || !token || token.trim() === "") return;

    const fetchAlbums = async () => {
      try {
        console.log("Using token:", token); 
        const response = await axios.get(
            `${url}/albums/${userID}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach the token to the request
                "Content-Type": "application/json",
              },
            }
          );
          setAlbums(response.data.albums);
          console.log("Albums fetched successfully:", response.data.albums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, [userID, token]); // Runs when userID changes

  return (
    <div>
      {albums.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {albums.map((album) => (
            <div key={album.id } onClick={()=>navigate(`/dashboard/album/${album.id}`)} className="p-4 shadow-lg rounded-lg">
              <img src={album.cover_url} alt={album.album_name} className="w-full h-32 object-cover rounded-lg" />
              <p className="text-center mt-2 font-semibold">{album.album_name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <SkeletonLoader/>
        </div>
      )}
    </div>
  );
}

export default Albums;
