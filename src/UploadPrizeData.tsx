interface PrizeDataProps {
  prizeName: string;
  prizeImage: string;
}

async function uploadPrizeData(prize: PrizeDataProps) {
  const formData = new FormData();
  formData.append("name", prize.prizeName);
  formData.append("image", prize.prizeImage);

  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {},
    body: formData,
  });

  const data = await res.json();
  console.log("Uploaded blob URL: ", data.url);
}

export default uploadPrizeData;
