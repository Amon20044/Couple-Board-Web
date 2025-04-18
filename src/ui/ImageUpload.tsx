import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { X, UploadCloud } from "lucide-react";
// import { uploadToCloudinary } from "@/utils/cloudinary";
const worker = new Worker(new URL('../worker/upload.worker.ts', import.meta.url), {
  type: 'module'
})

export const ImageUpload = ({ albumId }: { albumId: string }) => {
  const [images, setImages] = useState<{ key: string; file: File; preview: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<any>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [images]);
  useEffect(() => {
    worker.onmessage = (e) => {
      const { type, progress, message } = e.data;

      if (type === "progress") {
        setProgress(progress);
      } else if (type === "success") {
        toast.success("Images uploaded successfully!");
        setUploading(false);
        setImages([]);
        setProgress(0);
        navigate(`/dashboard/album/${albumId}`);
      } else if (type === "error") {
        toast.error(message || "Upload failed");
        setUploading(false);
        setProgress(0);
      }
    };
  }, [albumId, navigate]);

  const onSelectFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newImages = Array.from(files).map((file, i) => ({
      key: `image-${Date.now()}-${i}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages(prevImages => [...prevImages, ...newImages]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    onSelectFiles(e.dataTransfer.files);
  };

  const removeImage = (key: string) => {
    setImages(prevImages => prevImages.filter(image => image.key !== key));
  };

  const handleUpload = async () => {
    setUploading(true);
    setProgress(0);
    try {
      const token = localStorage.getItem("token") || "";
      if (!token) throw new Error("No token found. Please log in again.");
      worker.postMessage({ images, albumId, token });
    } catch (error: any) {
      console.error("Upload failed:", error);
      toast.error(error.message || "An error occurred during upload.");
      setUploading(false);
    }
  };


  return (
    <div className="flex flex-col items-center gap-4 p-6 border max-h-[80vh] rounded-lg shadow-lg bg-white w-full max-w-2xl">
      {uploading && (
        <div className="w-full mt-2">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-2 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1 text-center">{Math.floor(progress)}% uploaded</p>
        </div>
      )}

      <div
        className={`w-full h-40 border-2 ${dragging ? "border-blue-500 bg-blue-100" : "border-gray-300"} border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadCloud className="text-gray-500 w-12 h-12" />
        <p className="text-gray-600 mt-2">Drag & Drop images here or click to browse</p>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => onSelectFiles(e.target.files)}
        />
      </div>

      <div className="grid grid-cols-5 gap-4 w-full overflow-y-scroll">
        {images.map(image => (
          <div key={image.key} className="relative w-24 h-24 rounded-lg group">
            <img src={image.preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            <button
              onClick={() => removeImage(image.key)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading || images.length === 0}
        className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ImageUpload;