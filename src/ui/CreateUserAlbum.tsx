import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaImage, FaTimesCircle } from 'react-icons/fa';
import { RiSparklingFill } from 'react-icons/ri';
import CreateAlbum from "@/utils/CreateAlbum";

interface Album {
    id: string;
    album_name: string;
    cover_url: string;
    description?: string;
    created_at: string;
}

export default function CreateAlbumPage() {
    const navigate = useNavigate();
    const [albumName, setAlbumName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [albumImages, setAlbumImages] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    // Get the user ID and token from localStorage
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const url = import.meta.env.VITE_BACKEND_URI;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAlbumImages([file]);

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleCreateAlbum = async () => {
        if (!userId || !token) {
            setMessage("❌ Authentication error. Please login again.");
            return;
        }

        if (!albumName || albumImages.length === 0) {
            setMessage("❌ Please provide an album name and cover image.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const albumID = await CreateAlbum(albumName, description, albumImages); // Await the promise to get the albumID
    
            // Proceed with the next steps after waiting
            console.log("Album created successfully with ID:", albumID.albumId);
            
            // Navigate to the new album page using the albumID
            navigate(`/dashboard/album/${albumID.albumId}`); // Ensure you have the navigate function available
    
        } catch (error) {
            console.error("Error creating album:", error);
            // Handle error appropriately
        } finally {
            setLoading(false);
        }
    };

    // Cleanup preview URL when component unmounts
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
            {/* Header Section */}
            <div className="w-full bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <FaHeart className="text-pink-500" />
                        Our Albums
                    </h1>
                    <button
                        onClick={() => document.getElementById('album-form')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center gap-2"
                    >
                        Create Album
                        <RiSparklingFill className="text-yellow-300" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Albums Grid Section - You can add your albums display logic here */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Album cards would go here */}
                </div>

                {/* Create Album Form */}
                <div id="album-form" className="max-w-lg mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden relative">
                    {/* Decorative top bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-400" />

                    <div className="p-8">
                        <div className="text-center mb-8">
                            <FaHeart className="text-pink-500 text-3xl mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Our Memory Album</h2>
                            <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
                                Capture our special moments together
                                <RiSparklingFill className="text-yellow-400" />
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="relative">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Album Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Give your album a special name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white/50"
                                    value={albumName}
                                    onChange={(e) => setAlbumName(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Write something sweet about this album..."
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white/50 min-h-[120px] resize-none"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Cover Image
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="image-upload"
                                        onChange={handleImageChange}
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className={`w-full flex items-center justify-center p-4 border-2 border-dashed rounded-lg transition-all cursor-pointer
                                            ${imagePreview ? 'border-pink-400 bg-pink-50/30' : 'border-gray-300 hover:border-pink-400'}`}
                                    >
                                        {!imagePreview ? (
                                            <div className="text-center">
                                                <FaImage className="mx-auto text-3xl text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500">Click to upload cover image</p>
                                            </div>
                                        ) : (
                                            <div className="relative w-full">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover rounded-lg"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setImagePreview(null);
                                                        setAlbumImages([]);
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:text-pink-500 transition-colors"
                                                >
                                                    <FaTimesCircle />
                                                </button>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <button
                                className={`w-full p-4 rounded-lg text-white font-semibold shadow-lg transition-all transform hover:scale-[1.02] 
                                    ${loading || !albumName || albumImages.length === 0
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
                                    }`}
                                onClick={handleCreateAlbum}
                                disabled={loading || !albumName || albumImages.length === 0}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                                        Creating...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        Create Our Album
                                        <FaHeart className="text-lg" />
                                    </div>
                                )}
                            </button>

                            {message && (
                                <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium
                                    ${message.includes("✅")
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}>
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
