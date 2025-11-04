import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const imageFile = formData.get("image");

    if (!name || !imageFile) {
      return res.status(400).json({ error: "Missing name or image" });
    }

    // Upload to Vercel Blob
    const blob = await put(`${name}.png`, imageFile, {
      contentType: "image/png",
      access: "public",
    });

    res.status(200).json({ success: true, blobUrl: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
}
