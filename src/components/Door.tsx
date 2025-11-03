import Curtain from "../assets/Curtain.png";
import { motion } from "framer-motion";

interface DoorProps {
  number: number;
  action?: () => void;
  onHover?: () => void;
}

function Door({ number, action }: DoorProps) {
  return (
    <>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        border-radius={"25px"}
        height={"100%"}
        src={Curtain}
        alt={"Door" + number}
        onClick={() => {
          action && action();
        }}
      />
    </>
  );
}

export default Door;
