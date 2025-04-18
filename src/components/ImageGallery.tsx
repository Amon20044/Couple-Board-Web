import { useState } from 'react';
import Masonry from 'react-masonry-css';
import PhotoSwipe from 'photoswipe';
import 'photoswipe/dist/photoswipe.css';
import { FaDownload,  FaHeart } from 'react-icons/fa';

type Media = {
  id: string;
  album_id: string;
  media_url: string;
  media_type: string;
  uploaded_at: string;
};

interface ImageGalleryProps {
  images: Media[];
  month: string;
}

interface ImageDimensions {
  [key: string]: { width: number; height: number };
}




const ImageGallery: React.FC<ImageGalleryProps> = ({ images, month }) => {
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({});
  const breakpointColumns = {
    default: 6,
    1536: 5,
    1280: 4,
    1024: 3,
    768: 2,
    640: 2
  };

  const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = url;
    });
  };

  const initPhotoSwipe = async (index: number) => {
    // Load all image dimensions if not already loaded
    const loadedDimensions = { ...imageDimensions };
    for (const image of images) {
      if (!loadedDimensions[image.id]) {
        loadedDimensions[image.id] = await getImageDimensions(image.media_url);
      }
    }
    setImageDimensions(loadedDimensions);

    const items = images.map((image) => ({
      src: image.media_url,
      width: loadedDimensions[image.id]?.width || 0,
      height: loadedDimensions[image.id]?.height || 0,
      alt: `Photo from ${month}`
    }));

    const gallery = new PhotoSwipe({
      dataSource: items,
      index,
      bgOpacity: 0.9,
      showHideAnimationType: 'fade',
      closeOnVerticalDrag: true,
      wheelToZoom: true,
      pinchToClose: false,
      maxZoomLevel: 4
    });

    gallery.init();

    gallery.on('destroy', () => {
      // Cleanup if needed
    });
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex m-7 -ml-2 w-auto max-[768px]:m-0 max-[768px]:ml-0"
      columnClassName="pl-2 bg-clip-padding"
    >
      {images.map((image, index) => (
        <div
          key={image.id}
          className="mb-4 group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => initPhotoSwipe(index)}
        >
          <div className="relative aspect-auto">
            <img
              src={image.media_url}
              alt={`Photo from ${month}`}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 ">
                <p className="text-white text-sm">
                  {new Date(image.uploaded_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <button
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <FaHeart className="text-white text-lg" />
              </button>
              <div className="flex space-x-2">
                <button
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(image.media_url, `image-${image.id}.jpg`);
                  }}
                >
                  <FaDownload className="text-white text-lg" />
                </button>
                
              </div>
            </div>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default ImageGallery;