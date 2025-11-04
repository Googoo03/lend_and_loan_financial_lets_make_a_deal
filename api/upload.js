import { put } from "@vercel/blob";
import formidable from 'formidable';
import { createReadStream } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({});
    
    const [fields, files] = await form.parse(req);
    const name = fields.name?.[0];
    const imageFile = files.image?.[0];

    if (!name || !imageFile) {
      return res.status(400).json({ error: "Missing name or image" });
    }

    // Create a read stream from the uploaded file
    const stream = createReadStream(imageFile.filepath);
    
    // Upload to Vercel Blob
    const blob = await put(`${name}.png`, stream, {
      contentType: imageFile.mimetype || "image/png",
      access: "public",
    });

    res.status(200).json({ success: true, blobUrl: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
}
