interface PrizeProps {
  url: string;
}

export default function Prize({ url }: PrizeProps) {
  if (!url) return <p>Loading...</p>;

  return (
    <div className="rounded-3 overflow-hidden d-inline-block">
      <img
        src={url}
        alt="Random prize"
        className="w-40 h-40 object-cover rounded-lg mb-3"
      />
    </div>
  );
}
