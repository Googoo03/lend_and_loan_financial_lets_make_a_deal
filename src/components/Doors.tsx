import Door from "./Door";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Prize from "./Prize";

function Doors() {
  const [pickPrize, setPickPrize] = useState(false);
  const [pickIndex, setPickIndex] = useState<boolean[]>([false, false, false]);
  const [numPickPrizes, setNumPickPrizes] = useState(0);

  const [prizeNames, setPrizeNames] = useState<string[] | null>(null);
  const [prizeName, setPrizeName] = useState<string | undefined>("");
  const [randomPrize, setRandomPrize] = useState<
    | {
        url: string;
        pathname: string;
      }[]
    | null
  >(null);

  const navigate = useNavigate();

  //Functions for buttons to determine action
  const handleKeep = () => {
    navigate("/");
  };
  const handlePlay = () => {
    setPickPrize(false);
  };
  const flipPickIndex = (index: number) => {
    setPickIndex((prev) => {
      const indices = prev;
      indices[index] = true;
      return indices;
    });
  };

  function RandomRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const pickPrizeTransition = { delay: 2 };
  //Define the 3 prizes
  //show whichever one when the door is clicked
  //set prize name accordingly
  useEffect(() => {
    async function fetchRandomJunk() {
      const res = await fetch("/api/junk/list");
      const data = await res.json();
      const allowedIndex = [RandomRange(0, data.junk.length - 1)];
      const randomIndex = RandomRange(0, 3);
      console.log(data);

      if (data.junk.length > 0) {
        const newName = data.junk
          .filter((_: any, index: number) => allowedIndex.includes(index))
          .map((prize: any) =>
            prize.pathname
              .split("/")
              .pop()
              .replace(/\.[^/.]+$/, "")
          );
        setRandomPrize((prev) => {
          const names = prev;
          if (names) names[randomIndex] = newName;
          return names;
        });
        setPrizeNames((prev) => {
          const names = prev;
          if (names) names[randomIndex] = newName;
          return names;
        });
      }
      console.log("Fetched prizes:", data.junk);
    }

    async function fetchRandomPrizes() {
      if (prizeNames && prizeNames.length > 0) return;

      const res = await fetch("/api/prizes/list");
      const data = await res.json();

      const allowedIndices = [
        RandomRange(0, data.prizes.length - 1),
        RandomRange(0, data.prizes.length - 1),
        RandomRange(0, data.prizes.length - 1),
      ];

      console.log(data);

      if (data.prizes.length > 0) {
        //Set the prize array as prizes initially
        setRandomPrize(
          data.prizes.filter((_: any, index: number) =>
            allowedIndices.includes(index)
          )
        );
        setPrizeNames(
          data.prizes
            .filter((_: any, index: number) => allowedIndices.includes(index))
            .map((prizes: any) =>
              prizes.pathname
                .split("/")
                .pop()
                .replace(/\.[^/.]+$/, "")
            )
        );
      }
      console.log("Fetched junk:", data.blobs);
    }

    async function fetchPrizesWrapper() {
      await fetchRandomPrizes();
      await fetchRandomJunk();
    }

    fetchPrizesWrapper();
    console.log("Prizes names: ", prizeNames);
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
            initial={{ scale: 1, background: "#ff831dff" }}
            whileHover={{ scale: 1.1, background: "#b85107ff" }}
            style={{
              width: "20vw",
              height: "10vh",
              background: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              margin: "5vh",
            }}
            className={"rounded-3 overflow-hidden"}
            onClick={handleKeep}
          >
            Keep!
          </motion.div>
          {numPickPrizes < 3 && (
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
              onClick={handlePlay}
            >
              Pick Again!
            </motion.div>
          )}
        </motion.div>
      )}
      <div className="container text-center z-index-1">
        <div className="row">
          <div className="col flex flex-col items-center justify-center">
            <Door
              number={pickPrize ? 1 : 0}
              canPickPrize={!pickPrize}
              onClick={() => {
                setPickPrize(true);
                flipPickIndex(0);
                setNumPickPrizes(numPickPrizes + 1);
                setPrizeName(prizeNames ? prizeNames[0] : "");
              }}
            />
            {randomPrize && pickIndex[0] && <Prize url={randomPrize[0].url} />}
          </div>
          <div className="col flex flex-col items-center justify-center">
            <Door
              number={2}
              canPickPrize={!pickPrize}
              onClick={() => {
                setPickPrize(true);
                flipPickIndex(1);

                setNumPickPrizes(numPickPrizes + 1);
                setPrizeName(prizeNames ? prizeNames[1] : "");
              }}
            />
            {randomPrize && pickIndex[1] && <Prize url={randomPrize[1].url} />}
          </div>
          <div className="col flex flex-col items-center justify-center">
            <Door
              number={3}
              canPickPrize={!pickPrize}
              onClick={() => {
                setPickPrize(true);
                flipPickIndex(2);

                setNumPickPrizes(numPickPrizes + 1);
                setPrizeName(prizeNames ? prizeNames[2] : "");
              }}
            />
            {randomPrize && pickIndex[2] && <Prize url={randomPrize[2].url} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Doors;
