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
          whileHover={{ scale: 1.1 }}
          className={"logo"}
          src={Logo}
          alt="Lets Make a Deal Logo"
          width={"100%"}
          onClick={handleClick}
        />
        <motion.img
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className={"host"}
          src={Host}
          alt="Hunk"
        />
      </div>
    </>
  );
}

export default Title;
