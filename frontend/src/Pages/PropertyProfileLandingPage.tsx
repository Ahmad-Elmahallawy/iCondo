import React, { useState } from "react";
import { Link } from "react-router-dom";
import CondoComponent from "../Components/Condo/Condo";
import PropertyInfoForm from "../Components/PropertyProfile/PropertyInfoForm";
import List from "../Components/Common/List";
import condos from "../Components/Condo/Condos.json";
import "../Style/LandingPageStyle/PropertyProfileLandingPageStyle.css";

const initialPropertyInfo = {
  title: "Windcreek Villa",
  address: "123 Main Street, Cityville",
  unitCount: "50",
  parkingSpotCount: "100",
  lockerCount: "25",
};

const PropertyProfileLandingPage: React.FC = () => {
  const [propertyInfo, setPropertyInfo] = useState(initialPropertyInfo);

  const handleSavePropertyInfo = (updatedInfo: typeof initialPropertyInfo) => {
    setPropertyInfo(updatedInfo);
    // Add logic to persist changes, e.g., update the state, local storage, or send to a server
  };

  return (
    <div className="property-profile-landing-page">
      <div className="property-info-section">
        <h1>{propertyInfo.title} Profile</h1>
        <PropertyInfoForm
          propertyInfo={propertyInfo}
          onSave={handleSavePropertyInfo}
        />
      </div>
      <div className="condo-list-section">
        <h1>Condo List</h1>
        <Link to="/add-unit">
          <button className="add-unit-button">Add Unit</button>
        </Link>
        <List
          items={condos}
          renderItem={(condo) => (
            <div key={condo.condoId} className="condo-wrapper">
              <CondoComponent condo={condo} />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default PropertyProfileLandingPage;
