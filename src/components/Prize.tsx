import { useEffect, useState } from "react";

export default function Prize() {
  const [randomPrize, setRandomPrize] = useState<{
    url: string;
    pathname: string;
  } | null>(null);

  useEffect(() => {
    async function fetchRandomPrize() {
      const res = await fetch("/api/prizes/list");
      const data = await res.json();
      console.log(data);

      if (data.blobs.length > 0) {
        setRandomPrize(data.blobs[0]);
      }
      console.log("Fetched prizes:", data.blobs);
    }

    fetchRandomPrize();
  }, []);

  if (!randomPrize) return <p>Loading...</p>;

  return (
    <div className="p-4 rounded-xl bg-white shadow-lg flex flex-col items-center">
      <img
        src={randomPrize.url}
        alt="Random prize"
        className="w-40 h-40 object-cover rounded-lg mb-3"
      />
    </div>
  );
}
