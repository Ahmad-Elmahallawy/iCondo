import { useParams } from "react-router-dom";

const IndividualCondoProfile = () => {
  const { id } = useParams();

  let initialCondoInfo = {
    unitNumber: "1",
    condoId: "1",
    netArea: "100",
    occupantName: "Will be done Sprint 3",
    condoFee: "890",
  };

  return (
    <div>
      <h2>Params: {id}</h2>
      <div className="condoProfileContainer">
        <h2>Condo Profile</h2>
        <form>
          {Object.keys(initialCondoInfo).map((key) => (
            <div className="input-container">
              <span className="input-label">{key}:</span>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default IndividualCondoProfile;
