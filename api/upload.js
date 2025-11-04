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

  const form = formidable({multiples: false});
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Form parse error" });
    }

    // Normalize name (can be array depending on form parsing)
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;

    // files.image may be an array or an object, or missing if the client sent a string/url
    let imageEntry = files && files.image ? files.image : undefined;
    if (Array.isArray(imageEntry)) imageEntry = imageEntry[0];

    if (!name || !imageEntry) {
      // If client sent the image as a text field (URL), it may appear in fields instead
      const possibleUrl = fields.image || fields.imageUrl;
      if (name && possibleUrl && typeof possibleUrl === "string") {
        try {
          // fetch the image URL server-side and upload the buffer
          const fetched = await fetch(possibleUrl);
          if (!fetched.ok) throw new Error(`Failed to fetch image URL: ${fetched.status}`);
          const arrayBuffer = await fetched.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const blob = await put(`${name}.png`, buffer, {
            contentType: fetched.headers.get("content-type") || "image/png",
            access: "public",
          });
          return res.status(200).json({ success: true, blobUrl: blob.url });
        } catch (err) {
          console.error("Upload via URL failed:", err);
          return res.status(400).json({ error: "Invalid image URL or fetch failed" });
        }
      }

      return res.status(400).json({ error: "Missing name or image" });
    }

    // Support different formidable versions/property names
    const filepath = imageEntry.filepath || imageEntry.path || imageEntry.filePath;

    try {
      if (filepath && typeof filepath === "string") {
        const stream = fs.createReadStream(filepath);
        const blob = await put(`${name}.png`, stream, {
          contentType: imageEntry.mimetype || imageEntry.mimetype || "image/png",
          access: "public",
        });
        return res.status(200).json({ success: true, blobUrl: blob.url });
      }

      // If formidable didn't write a temp file, check for raw buffer properties (defensive)
      if (imageEntry._writeStream && imageEntry._writeStream.path) {
        const stream = fs.createReadStream(imageEntry._writeStream.path);
        const blob = await put(`${name}.png`, stream, {
          contentType: imageEntry.mimetype || "image/png",
          access: "public",
        });
        return res.status(200).json({ success: true, blobUrl: blob.url });
      }

      // As a last resort, if imageEntry has a 'toBuffer' or 'buffer', use that
      if (imageEntry && imageEntry.buffer) {
        const buffer = Buffer.isBuffer(imageEntry.buffer) ? imageEntry.buffer : Buffer.from(imageEntry.buffer);
        const blob = await put(`${name}.png`, buffer, {
          contentType: imageEntry.mimetype || "image/png",
          access: "public",
        });
        return res.status(200).json({ success: true, blobUrl: blob.url });
      }

      console.error("Uploaded file missing filepath and no buffer available:", imageEntry);
      return res.status(500).json({ error: "Uploaded file missing path on server" });
    } catch (uploadErr) {
      console.error("Upload error:", uploadErr);
      return res.status(500).json({ error: "Upload failed", details: uploadErr.message });
    }
  });
}
