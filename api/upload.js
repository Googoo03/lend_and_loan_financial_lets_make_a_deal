import { put } from "@vercel/blob";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // if your framework would normally parse bodies
  },
};

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const form = new formidable({multiples: false});
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Form parse error" });
    }

    const name = fields.name;
    const imageFile = files.image;
    if (!name || !imageFile) return res.status(400).json({ error: "Missing name or image" });

    try {
      const stream = fs.createReadStream(imageFile.filepath);
      const blob = await put(`${name}.png`, stream, {
        contentType: imageFile.mimetype || "image/png",
        access: "public",
      });
      return res.status(200).json({ success: true, blobUrl: blob.url });
    } catch (uploadErr) {
      console.error("Upload error:", uploadErr);
      return res.status(500).json({ error: "Upload failed", details: uploadErr.message });
    }
  });
}
