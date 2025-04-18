import { useParams} from "react-router-dom";
import { ImageUpload } from "../ui/ImageUpload";
import CreateAlbumPage from "../ui/CreateUserAlbum";
import LogoButton from "@/ui/LogoButton";

export const Add = () => {
  const { albumId } = useParams<{ albumId: string }>(); // Extract albumId from URL

  if (!albumId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-[100vw]">
        <CreateAlbumPage />
        
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <LogoButton/>

      <p className="text-2xl font-semibold mb-4">Upload Images to Album: {albumId}</p>

      <ImageUpload albumId={albumId}/>
    </div>
  );
};
