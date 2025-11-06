import { motion, AnimatePresence } from "framer-motion";

interface PrizeProps {
  url: string;
}

export default function Prize({ url }: PrizeProps) {
  if (!url) return <p>Loading...</p>;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        style={{ height: "100%" }}
        className="rounded-3 overflow-hidden d-inline-block"
      >
        <img className="img-fluid" src={url} alt="Random prize" />
      </motion.div>
    </AnimatePresence>
  );
}
