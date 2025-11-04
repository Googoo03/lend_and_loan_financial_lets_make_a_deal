interface PrizeDataProps {
  prizeName: string;
  prizeImage: string; // URL from imported asset
}

async function uploadPrizeData(prize: PrizeDataProps) {
  try {
    // Fetch the image from the Vite-imported URL
    const response = await fetch(prize.prizeImage);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("name", prize.prizeName);
    formData.append("image", blob, prize.prizeImage);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed with status: ${res.status}`);
    }

    const data = await res.json();
    if (!data.blobUrl) {
      throw new Error("No blob URL returned");
    }

    console.log("Uploaded blob URL: ", data.blobUrl);
    return data.blobUrl;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}

export default uploadPrizeData;
