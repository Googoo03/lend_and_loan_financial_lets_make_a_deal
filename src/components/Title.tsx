import { useNavigate } from "react-router-dom";
import Logo from "../assets/LetsMakeADealLogo.jpg";

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
      <div>
        <img
          className={"logo"}
          src={Logo}
          alt="Lets Make a Deal Logo"
          width={"100%"}
          onClick={handleClick}
        />
        <h1>Lets Make a Deal Sample Title</h1>
      </div>
    </>
  );
}

export default Title;
