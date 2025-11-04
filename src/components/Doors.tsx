import Door from "./Door";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Doors() {
  const [pickPrize, setPickPrize] = useState(false);
  const [prizeName, setPrizeName] = useState("");

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const pickPrizeTransition = { delay: 2 };

  return (
    <>
      {pickPrize && (
        <motion.div
          style={{
            position: "fixed", // 👈 stays in same place even when scrolling
            top: 0,
            left: 0,
            width: "100vw",
            height: "100dvh",
            background: "rgba(0, 0, 0, 0.5)", // semi-transparent backdrop
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999, // 👈 ensures it's above everything
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={pickPrizeTransition}
        >
          <h1
            style={{
              color: "#FFFFFF",
              display: "block",
              width: "100%",
              textAlign: "center",
            }}
          >
            You picked {prizeName}!
          </h1>
          <motion.div
            initial={{ scale: 1, background: "#FFFFFF" }}
            whileHover={{ scale: 1.1, background: "#AAAAAA" }}
            style={{
              width: "20vw",
              height: "10vh",
              background: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
            className={"rounded-3 overflow-hidden"}
            onClick={handleClick}
          >
            Back to Title
          </motion.div>
        </motion.div>
      )}
      <div className="container text-center z-index-1">
        <div className="row">
          <div className="col">
            <Door
              number={pickPrize ? 1 : 0}
              canPickPrize={!pickPrize}
              onClick={() => {
                setPickPrize(true);
                setPrizeName("Car");
              }}
            />
          </div>
          <div className="col">
            <Door
              number={2}
              canPickPrize={!pickPrize}
              onClick={() => {
                setPickPrize(true);
              }}
            />
          </div>
          <div className="col">
            <Door
              number={3}
              canPickPrize={!pickPrize}
              onClick={() => {
                setPickPrize(true);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Doors;
