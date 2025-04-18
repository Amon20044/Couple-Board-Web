import { useState, useEffect } from 'react';
import { FaImage, FaHeart, FaTimesCircle } from 'react-icons/fa';
import { RiSparklingFill } from 'react-icons/ri';

const Add = () => {
    const [albumName, setAlbumName] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file);
            const previewUrl = URL.createObjectURL(file);
            setCoverPreview(previewUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        
        try {
            // Handle album creation logic here
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
            setMessage('✅ Album created successfully!');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Album was not created';
            setMessage(`❌ ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    // Cleanup preview URL when component unmounts
    useEffect(() => {
        return () => {
            if (coverPreview) {
                URL.revokeObjectURL(coverPreview);
            }
        };
    }, [coverPreview]);

    return (
        <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-pink-100 to-purple-100 py-8">
            <div className="max-w-lg mx-auto px-4">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden relative">
                    {/* Decorative top bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-400" />
                    
                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <FaHeart className="text-pink-500 text-3xl mx-auto mb-4" />
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Our Memory Album</h1>
                            <p className="text-gray-600 flex items-center justify-center gap-2">
                                Capture our special moments together
                                <RiSparklingFill className="text-yellow-400" />
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Album Name */}
                            <div className="space-y-2">
                                <label htmlFor="albumName" className="block text-gray-700 text-sm font-semibold">
                                    Album Name
                                </label>
                                <input
                                    type="text"
                                    id="albumName"
                                    value={albumName}
                                    onChange={(e) => setAlbumName(e.target.value)}
                                    placeholder="Give your album a special name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white/50"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-semibold">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Write something sweet about this album..."
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white/50 resize-none"
                                />
                            </div>

                            {/* Cover Image */}
                            <div className="space-y-2">
                                <label className="block text-gray-700 text-sm font-semibold">
                                    Cover Image
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="coverImage"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="coverImage"
                                        className={`w-full flex items-center justify-center p-4 border-2 border-dashed rounded-lg transition-all cursor-pointer
                                            ${coverPreview ? 'border-pink-400 bg-pink-50/30' : 'border-gray-300 hover:border-pink-400'}`}
                                    >
                                        {coverPreview ? (
                                            <div className="relative w-full">
                                                <img
                                                    src={coverPreview}
                                                    alt="Cover preview"
                                                    className="w-full h-48 object-cover rounded-lg"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCoverPreview('');
                                                        setCoverImage(null);
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:text-pink-500 transition-colors"
                                                >
                                                    <FaTimesCircle />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <FaImage className="mx-auto text-3xl text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500">Click to upload cover image</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !albumName || !coverImage}
                                className={`w-full p-4 rounded-lg text-white font-semibold shadow-lg transition-all transform hover:scale-[1.02] 
                                    ${loading || !albumName || !coverImage
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
                                    }`}
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

                            {/* Status Message */}
                            {message && (
                                <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium
                                    ${message.includes("✅") 
                                        ? "bg-green-100 text-green-700" 
                                        : "bg-red-100 text-red-700"
                                    }`}>
                                    {message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;
