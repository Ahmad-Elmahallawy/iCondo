// LandingPage.tsx
import React, { useState } from "react";
import CondoInfoForm from "../Components/CondoProfile/CondoInfoForm";
import "../Style/LandingPageStyle/CondoProfileLandingPageStyle.css";

const initialCondoInfo = {
  condoId: "1",
  netArea: "100",
  occupantName: "John Doe",
  propertyId: "330",
  parkingId: "4537",
  condoFee: "890",
  lockerId: "345",
};
const LandingPage: React.FC = () => {
  const [condoInfo, setCondoInfo] = useState(initialCondoInfo);

  const handleSaveCondoInfo = (updatedInfo: typeof initialCondoInfo) => {
    setCondoInfo(updatedInfo);
    // Add logic to persist changes, e.g., update the state, local storage, or send to a server
  };

  return (
    <div className="main-container">
      <CondoInfoForm condoInfo={condoInfo} onSave={handleSaveCondoInfo} />
    </div>
  );
};

export default LandingPage;
