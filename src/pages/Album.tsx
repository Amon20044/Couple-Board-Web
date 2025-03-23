import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaImage, FaSpinner, FaHeart, FaPlus, FaTimes, FaArrowLeft, FaCalendar } from 'react-icons/fa';
import { groupMediaByMonthYear } from "../utils/filterAlbum";
import ImageGallery from "@/components/ImageGallery";


type Media = {
  id: string;
  album_id: string;
  media_url: string;
  media_type: string;
  uploaded_at: string;
};

type AlbumDetails = {
  name: string;
  description: string;
  cover_url: string;
};

const Album = () => {
  const { album_id } = useParams<{ album_id: string }>();
  const [mediaByMonth, setMediaByMonth] = useState<{ [key: string]: Media[] }>({});
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const url: string = import.meta.env.VITE_BACKEND_URI;


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    else console.error("No auth token found");
  }, []);

  useEffect(() => {
    if (!album_id || !token) return;

    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${url}/media/${album_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const groupedMedia = groupMediaByMonthYear(response.data.media || []);
        setMediaByMonth(groupedMedia);
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [album_id, token]);

  useEffect(() => {
    if (!album_id || !token) return;

    const fetchAlbumDetails = async () => {
      try {
        // First get all albums
        const allAlbumsResponse = await axios.get(
          `${url}/albums/${localStorage.getItem("userId")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Find the specific album from the list
        const currentAlbum = allAlbumsResponse.data.albums.find(
          (album: any) => album.id === album_id
        );

        if (currentAlbum) {
          setAlbumDetails({
            name: currentAlbum.album_name,
            description: currentAlbum.description || "",
            cover_url: currentAlbum.cover_url
          });
        } else {
          console.error("Album not found");
          setAlbumDetails({
            name: "Album Not Found",
            description: "This album might have been deleted or you don't have access to it.",
            cover_url: ""
          });
        }
      } catch (error) {
        console.error("Error fetching album details:", error);
        setAlbumDetails({
          name: "Error Loading Album",
          description: "There was an error loading this album. Please try again later.",
          cover_url: ""
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [album_id, token, url]);

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-rose-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-screen bg-white/90 backdrop-blur-md shadow-lg">
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition-colors">
              <FaArrowLeft className="text-lg" />
              <span>Back to Dashboard</span>
            </Link>
            <button 
              onClick={openUploadModal}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center space-x-2"
            >
              <FaPlus className="text-sm" />
              <span>Add Photos</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[200px] w-screen overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {albumDetails?.cover_url ? (
          <img
            src={albumDetails.cover_url}
            alt={albumDetails.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400" />
        )}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 max-w-[2000px] mx-auto">
          <h1 className="text-5xl font-bold mb-3 text-white">{albumDetails?.name || "Our Album"}</h1>
          <p className="text-xl text-white/90">{albumDetails?.description}</p>
        </div>
      </div>

      {/* Content Section */}
      <main className="w-screen px-4 py-8">
        <div className="max-w-[2000px] mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <FaSpinner className="animate-spin text-4xl text-purple-500" />
            </div>
          ) : Object.keys(mediaByMonth).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(mediaByMonth).map(([month, images]) => (
                <div key={month} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <FaCalendar className="text-lg text-purple-500" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">{month}</h2>
                    </div>
                    <span className="text-sm text-gray-500">
                      {images.length} photos
                    </span>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 md:p-6">
                    <ImageGallery images={images} month={month} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl">
              <FaImage className="mx-auto text-5xl text-gray-300 mb-4" />
              <p className="text-gray-600 text-xl font-medium">
                No memories yet. Start by adding your first photo! 
                <FaHeart className="inline-block ml-2 text-pink-500" />
              </p>
              <button
                onClick={openUploadModal}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Add Your First Photo
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 overflow-hidden shadow-2xl transform transition-all">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <FaImage /> Add New Memory
              </h3>
              <button
                onClick={closeUploadModal}
                className="text-white hover:text-white/80 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Drag and Drop Zone */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FaImage className="text-4xl text-gray-400 mb-3" />
                    <p className="text-gray-600">
                      Drag and drop your photos here, or{" "}
                      <span className="text-purple-500 font-medium">browse</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Supports: JPG, PNG, GIF (Max 10MB)
                    </p>
                  </label>
                </div>

                {/* Preview Section (if needed) */}
                <div className="mt-4">
                  {/* Add preview logic here */}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={closeUploadModal}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Upload Photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Album;
