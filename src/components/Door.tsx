import Curtain from "../assets/Curtain.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface DoorProps {
  number: number;
  action?: () => void;
  onClick?: () => void;
}

function Door({ number, onClick }: DoorProps) {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="rounded-3 overflow-hidden d-inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: -500, opacity: 0 }}
            whileHover={{ y: -50 }}
          >
            <motion.img
              src={Curtain}
              alt={"Door " + number}
              className="img-fluid"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setVisible(false);
                onClick?.();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {!visible && <div>Prize {number}</div>}
    </>
  );
}

export default Door;
