import Door from "./Door";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Prize from "./Prize";

function Doors() {
  const [pickPrize, setPickPrize] = useState(false);
  const [pickIndex, setPickIndex] = useState(-1);
  const [prizeName, setPrizeName] = useState<string | undefined>("");
  const [randomPrize, setRandomPrize] = useState<
    | {
        url: string;
        pathname: string;
      }[]
    | null
  >(null);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const pickPrizeTransition = { delay: 2 };
  //Define the 3 prizes
  //show whichever one when the door is clicked
  //set prize name accordingly
  useEffect(() => {
    async function fetchRandomPrize() {
      const res = await fetch("/api/prizes/list");
      const data = await res.json();
      console.log(data);

      if (data.prizes.length > 0) {
        setRandomPrize(data.prizes);
      }
      console.log("Fetched prizes:", data.blobs);
    }

    fetchRandomPrize();
  }, []);

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
                setPickIndex(0);
                setPrizeName(
                  randomPrize ? randomPrize[1].pathname.split("/").pop() : ""
                );
              }}
            />
            {randomPrize && pickPrize && pickIndex === 0 && (
              <Prize url={randomPrize[1].url} />
            )}
          </div>
          <div className="col">
            <Door
              number={2}
              canPickPrize={!pickPrize}
              onClick={() => {
                setPickPrize(true);
                setPickIndex(1);
                setPrizeName(
                  randomPrize ? randomPrize[1].pathname.split("/").pop() : ""
                );
              }}
            />
            {randomPrize && pickPrize && pickIndex === 1 && (
              <Prize url={randomPrize[2].url} />
            )}
          </div>
          <div className="col">
            <Door
              number={3}
              canPickPrize={!pickPrize}
              onClick={() => {
                setPickPrize(true);
                setPickIndex(2);
                setPrizeName(
                  randomPrize ? randomPrize[1].pathname.split("/").pop() : ""
                );
              }}
            />
            {randomPrize && pickPrize && pickIndex === 2 && (
              <Prize url={randomPrize[3].url} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Doors;
