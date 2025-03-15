import { useState, useEffect } from "react";
import { uploadImages } from "../utils/uploadImage"; // Import the upload function
import { useNavigate } from "react-router-dom";

export const ImageUpload = ({ albumId }: { albumId: string }) => {
  const [images, setImages] = useState<{ key: string; file: File; preview: string }[]>([]);
  const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newImages = Array.from(e.target.files).map(file => ({
      key: `image-${Date.now()}-${file.name}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages(prevImages => [...prevImages, ...newImages]);
  };

  const removeImage = (key: string) => {
    setImages(prevImages => prevImages.filter(image => image.key !== key));
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      await uploadImages(albumId, images.map(img => img.file));
      setImages([]); // Clear images after successful upload
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
      navigate(`/dashboard/album/${albumId}`)}
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md">
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Add Media
        <input type="file" accept="image/*" multiple onChange={onSelectFiles} className="hidden" />
      </label>

      <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <div key={image.key} className="relative">
            <img src={image.preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
            <button
              onClick={() => removeImage(image.key)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ImageUpload;