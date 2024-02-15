// LandingPage.tsx
import React, { useState } from "react";
import CondoInfoForm from "../Components/CondoProfile/CondoInfoForm";
import "../Style/LandingPageStyle/CondoProfileLandingPageStyle.css";

const initialCondoInfo = {
  condoId: "123",
  netArea: "123 Cruise Street, 1A3 1A3, Montreal, QC",
  occupantName: "Jane Doe",
  parkingSpotCount: "200",
  lockerCount: "200",
  bathrooms: "2",
  bedrooms: "2",
  condoType: "divided",
  lastRenovated: "2019",
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
