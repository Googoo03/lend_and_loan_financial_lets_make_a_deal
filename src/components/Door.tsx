import Curtain from "../assets/Curtain.png";
import { motion } from "framer-motion";
import { useState } from "react";

interface DoorProps {
  number: number;
  action?: () => void;
  onHover?: () => void;
}

function Door({ number }: DoorProps) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {visible && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          whileHover={{ y: 50 }}
          border-radius={"25px"}
          height={"100%"}
          src={Curtain}
          alt={"Door" + number}
          onClick={() => {
            setVisible(false);
          }}
        />
      )}
    </>
  );
}

export default Door;
