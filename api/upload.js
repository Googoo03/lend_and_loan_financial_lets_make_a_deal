import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false, // since we'll handle file data manually
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = await new Promise((resolve, reject) => {
      const chunks = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });
      req.on("error", reject);
    });

    // Parse multipart/form-data
    const boundary = req.headers["content-type"].split("boundary=")[1];
    const parts = formData.toString().split(`--${boundary}`);

    // Extract name and image buffer
    const nameMatch = parts.find((p) => p.includes('name="name"'));
    const imageMatch = parts.find((p) => p.includes('name="image"'));

    const name = nameMatch?.split("\r\n\r\n")[1]?.trim();
    const imageBase64 = imageMatch?.split("\r\n\r\n")[1]?.split("\r\n--")[0];

    const imageBuffer = Buffer.from(imageBase64, "binary");

    // Upload to blob storage
    const blob = await put(`${name}.png`, imageBuffer, {
      contentType: "image/png",
      access: "public",
    });

    res.status(200).json({ success: true, blobUrl: blob.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
}
