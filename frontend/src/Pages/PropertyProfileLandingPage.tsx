import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import CondoComponent from "../Components/Condo/Condo";
import PropertyInfoForm from "../Components/PropertyProfile/PropertyInfoForm";
import List from "../Components/Common/List";
import condos from "../Components/Condo/Condos.json";
import "../Style/LandingPageStyle/PropertyProfileLandingPageStyle.css";

// Define the type for the property info
interface PropertyInfo {
  title: string;
  address: string;
  unitCount: string;
  parkingSpotCount: string;
  lockerCount: string;
}

const PropertyProfileLandingPage: React.FC = () => {
  // Use useState with an initializer function
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo>(() => ({
    title: "",
    address: "",
    unitCount: "",
    parkingSpotCount: "",
    lockerCount: "",
  }));

  const location = useLocation();

  // Use useEffect to update propertyInfo when location changes
  useEffect(() => {
    if (location.state && location.state.property) {
      const receivedPropertyInfo: PropertyInfo = location.state.property;
      setPropertyInfo(receivedPropertyInfo);
    }
  }, [location.state]);

  const handleSavePropertyInfo = (updatedInfo: PropertyInfo) => {
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
