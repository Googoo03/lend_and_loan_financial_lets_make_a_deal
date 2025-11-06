interface PrizeProps {
  url: string;
}

export default function Prize({ url }: PrizeProps) {
  if (!url) return <p>Loading...</p>;

  return (
    <div className="rounded-3 overflow-hidden d-inline-block">
      <img className="img-fluid" src={url} alt="Random prize" />
    </div>
  );
}
