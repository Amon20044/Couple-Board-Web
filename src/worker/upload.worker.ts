import imgBBuploader from "@/utils/imgBB";
import { uploadImages } from "@/utils/uploadImage";

self.onmessage = async (event: MessageEvent) => {
  const { images, albumId, token } = event.data;

  console.log("📦 Received images:", images);
  console.log("📁 Received albumId:", albumId);

  try {
    const chunkSize = 3;

    for (let i = 0; i < images.length; i += chunkSize) {
      const chunk = images.slice(i, i + chunkSize);

      // Upload this chunk in parallel
      const chunkUrls = await Promise.all(
        chunk.map((image: { file: File }) => imgBBuploader(image.file)),
      );
      const urls: string[] = [];
      urls.push(...chunkUrls);
      await uploadImages(albumId, chunkUrls, token);

      // ✅ Send progress update to main thread
      const progress = Math.min(((i + chunkSize) / images.length) * 100, 100);
      self.postMessage({ type: "progress", progress }); // progress in %
      console.log(`✅ Uploaded chunk ${i / chunkSize + 1}, Progress: ${progress}%`);
    }

    // ✅ Notify main thread of success
    self.postMessage({ type: "success" });

  } catch (error: any) {
    console.error("❌ Upload failed in worker:", error);
    self.postMessage({ type: "error", message: error.message });
  }
};
