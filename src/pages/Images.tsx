import { useState, useEffect } from "react";
import axios from "axios";
import { groupMediaByMonthYear } from "../utils/filterAlbum";
import SkeletonLoader from "@/ui/SkeletonLoader";
import ImageGallery from "@/components/ImageGallery";
import { FaUpload } from 'react-icons/fa';

function Images() {
    const [imagesByMonth, setImagesByMonth] = useState<{ [key: string]: any[] }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const url: string = import.meta.env.VITE_BACKEND_URI;

    useEffect(() => {
        if (!userId || !token) {
            console.error("Missing userId or token");
            return;
        }

        const fetchImages = async () => {
            try {
                const response = await axios.get(`${url}/media/images/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const groupedImages = groupMediaByMonthYear(response.data.media.data);
                setImagesByMonth(groupedImages);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [userId, token]);

    return (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-rose-50 to-indigo-50">
            <div className="relative h-[200px] w-screen overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 max-w-[2000px] mx-auto">
                    <h1 className="text-5xl font-bold mb-3 text-white">Our Images</h1>
                </div>
            </div>

            {/* Main Content */}
            <main className="w-screen md:px-6 py-6">
                <div className="max-w-[100vw] mx-auto">
                    {loading ? (
                        <SkeletonLoader type="grid" items={8} />
                    ) : Object.keys(imagesByMonth).length > 0 ? (
                        <div className="space-y-8">
                            {Object.keys(imagesByMonth).map((month) => (
                                <div key={month} className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold text-gray-800">{month}</h2>
                                            <span className="text-sm text-gray-500 bg-gray-100/80 px-3 py-1 rounded-full">
                                                {imagesByMonth[month].length} photos
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 md:p-6">
                                        <ImageGallery images={imagesByMonth[month]} month={month} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-8 text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl">
                            <div className="max-w-md mx-auto">
                                <img
                                    src="/empty-gallery.svg"
                                    alt="No images"
                                    className="w-48 h-48 mx-auto mb-6 opacity-60"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    No Images Yet
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Start adding photos to create beautiful memories together
                                </p>
                                <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center space-x-2 mx-auto">
                                    <FaUpload className="text-lg" />
                                    <span>Upload Your First Photo</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Images;
