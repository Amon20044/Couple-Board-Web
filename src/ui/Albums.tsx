import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaCalendar, FaImages } from 'react-icons/fa';
import SkeletonLoader from "@/ui/SkeletonLoader";

interface Album {
  id: string;
  album_name: string;
  cover_url: string;
  description?: string;
  created_at: string;
  photo_count?: number;
}

function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [userID, setUserID] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  const url: string = import.meta.env.VITE_BACKEND_URI;

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

  useEffect(() => {
    if (!userID || !token || token.trim() === "") return;

    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          `${url}/albums/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setAlbums(response.data.albums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [userID, token]);

  const isDashboard = location.pathname === "/dashboard" || location.pathname === "/";
  const isAlbumsPage = location.pathname === "/dashboard/albums";

  const AlbumCard = ({ album }: { album: Album }) => (
    <div
      onClick={() => navigate(`/dashboard/album/${album.id}`)}
      className={`group relative overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl ${isDashboard
          ? "snap-start flex-none w-[250px] aspect-square rounded-3xl"
          : "w-full aspect-[4/3] rounded-2xl"
        }`}
    >
      {/* Background Image or Gradient */}
      <div className="absolute inset-0">
        {album.cover_url ? (
          <img
            src={album.cover_url}
            alt={album.album_name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="text-white/90 text-sm flex items-center">
            <FaCalendar className="mr-2" />
            {new Date(album.created_at).toLocaleDateString()}
          </span>
          <span className="text-white/90 text-sm flex items-center">
            <FaImages className="mr-2" />
          </span>
        </div>

        <div>
          <h4 className="text-2xl font-bold text-white mb-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            {album.album_name}
          </h4>
          {album.description && (
            <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              {album.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const CreateAlbumCard = () => (
    <div
      onClick={() => navigate('/create-album')}
      className={`group relative overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-pink-500 to-purple-500 ${isDashboard
          ? "snap-start flex-none w-[280px] sm:w-[320px] aspect-square rounded-3xl"
          : "w-full aspect-[4/3] rounded-2xl"
        }`}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
          <FaPlus className="text-2xl text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2 transform group-hover:scale-105 transition-transform duration-500">Create Album</h3>
        <p className="text-white/80 text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          Start a new collection of memories
        </p>
      </div>
    </div>
  );

  if (isAlbumsPage) {
    return (
      <div className="w-screen max-w-[100vw] mx-auto h-screen ">
        <div className="relative h-[200px] w-screen overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400" />
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8 max-w-[2000px] mx-auto">
            <h1 className="text-5xl font-bold mb-3 text-white">Our Albums</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 mx-4 my-8 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <CreateAlbumCard />
          {loading ? (
            <SkeletonLoader/>
          ) : (
            albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    // Horizontal scroll layout for dashboard
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-4 snap-x snap-mandatory">
        <CreateAlbumCard />
        {loading ? (
          <SkeletonLoader />
        ) : (
          albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))
        )}
      </div>
    </div>
  );
}

export default Albums;
