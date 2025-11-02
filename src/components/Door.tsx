interface DoorProps {
  number: number;
}

function Door({ number }: DoorProps) {
  return (
    <>
      <h2>Door {number}</h2>
    </>
  );
}

export default Door;
