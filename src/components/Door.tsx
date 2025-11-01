interface DoorProps {
  number: number;
}

function Door({ number }: DoorProps) {
  return (
    <>
      <div>
        <h2>Door {number}</h2>
      </div>
    </>
  );
}

export default Door;
