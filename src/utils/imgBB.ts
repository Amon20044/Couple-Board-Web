const API_KEY = import.meta.env.VITE_IMAGEBB_KEY;

export default async function imgBBuploader(file: File): Promise<string> {
  if (!API_KEY) throw new Error("Missing ImgBB API Key");

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!data.success) throw new Error(data.error?.message || "Upload failed");

  return data.data.url;
}
