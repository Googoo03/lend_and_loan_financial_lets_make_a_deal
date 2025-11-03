import Curtain from "../assets/Curtain.png";

interface DoorProps {
  number: number;
}

function Door({ number }: DoorProps) {
  return (
    <>
      <img src={Curtain} alt={"Door" + number} />
    </>
  );
}

export default Door;
