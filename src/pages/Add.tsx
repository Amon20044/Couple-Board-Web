import { useParams} from "react-router-dom";
import { ImageUpload } from "../ui/ImageUpload";
import Albums from "../ui/Albums";
import CreateAlbumPage from "../ui/CreateUserAlbum";

export const Add = () => {
  const { albumId } = useParams<{ albumId: string }>(); // Extract albumId from URL

  if (!albumId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-2xl font-semibold mb-4">Select or Create an Album</h1>
        <CreateAlbumPage />
        <Albums />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <button
        className="mb-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        onClick={() => window.history.back()} // Back button
      >
        ← Back
      </button>

      <p className="text-2xl font-semibold mb-4">Upload Images to Album: {albumId}</p>

      <ImageUpload albumId={albumId}/>
    </div>
  );
};
