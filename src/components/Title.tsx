import { useNavigate } from "react-router-dom";
import Logo from "../assets/LetsMakeADealLogo.png";
import Host from "../assets/Lets-Make-A-Deal-Host.png";
import { motion } from "framer-motion";

interface TitleProps {
  clickLink: string;
}

function Title({ clickLink }: TitleProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(clickLink);
  };

  return (
    <>
      <div className="center-horizontal">
        <motion.img
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className={"logo"}
          src={Logo}
          alt="Lets Make a Deal Logo"
          width={"100%"}
          onClick={handleClick}
        />
        <div
          style={{
            position: "fixed", // or "absolute" if inside a relative container
            left: 0,
            bottom: 0,
            width: "500px", // or whatever size you want
            height: "500px",
            overflow: "hidden", // ✅ hides any part of the image that overflows

            zIndex: 3,
          }}
        >
          <motion.img
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scaleX: 0.9, scaleY: 1.1 }}
            style={{
              position: "absolute", // position relative to parent
              bottom: 0, // stick to bottom
              left: 0, // stick to left
              width: "500px", // control image size
              height: "auto",
              objectFit: "contain",
              zIndex: 4,
            }}
            src={Host}
            alt="Hunk"
          />
        </div>
      </div>
    </>
  );
}

export default Title;
