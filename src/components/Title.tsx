import { useNavigate } from "react-router-dom";
import Logo from "../assets/LetsMakeADealLogo.png";
import Host from "../assets/Lets-Make-A-Deal-Host.png";

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
        <img
          className={"logo"}
          src={Logo}
          alt="Lets Make a Deal Logo"
          width={"100%"}
          onClick={handleClick}
        />
        <img className={"host"} src={Host} alt="Hunk" />
        <h1>Lets Make a Deal Sample Title</h1>
      </div>
    </>
  );
}

export default Title;
