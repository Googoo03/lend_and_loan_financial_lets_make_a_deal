import Door from "./Door";

function Doors() {
  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <Door number={1} />
          </div>
          <div className="col">
            <Door number={2} />
          </div>
          <div className="col">
            <Door number={3} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Doors;
