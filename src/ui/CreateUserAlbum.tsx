import { useState } from "react";
import CreateAlbum from "../utils/CreateAlbum"; // Import the function
import { useNavigate } from "react-router-dom";

export default function CreateAlbumPage() {
    const [albumName, setAlbumName] = useState<string>("");
    const [coverUrl, setCoverUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const navigate= useNavigate();
    const handleCreateAlbum = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await CreateAlbum(albumName, coverUrl);
            setMessage(`✅ Album Created`);
        } catch (error) {
            setMessage("❌ Failed to create album. Please try again.");
        }

        setLoading(false);
        window.location.reload();
    };

    return (
        <div className="">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-700 mb-4">🎵 Create a New Album</h2>

                <input
                    type="text"
                    placeholder="Album Name"
                    className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Cover Image URL (optional)"
                    className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                />

                <button
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                    onClick={handleCreateAlbum}
                    disabled={loading}
                >
                    {loading ? "Creating Album..." : "Create Album"}
                </button>

                {message && (
                    <p className={`mt-3 text-center ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
