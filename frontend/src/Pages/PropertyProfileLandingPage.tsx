import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import CondoComponent from "../Components/Condo/Condo";
import PropertyInfoForm from "../Components/PropertyProfile/PropertyInfoForm";
import List from "../Components/Common/List";
import condos from "../Components/Condo/Condos.json";
import "../Style/LandingPageStyle/PropertyProfileLandingPageStyle.css";
import axios from 'axios'; // Import Axios


// Define the type for the property info
interface PropertyInfo {
  title: string;
  address: string;
  unitCount: string;
  parkingSpotCount: string;
  lockerCount: string;
}

// Define an interface for the state object passed to the Link component
interface LinkStateProps {
  state: {
    propertyInfo: PropertyInfo;
  };
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

  const handleSavePropertyInfo = async (updatedInfo: PropertyInfo) => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const token = userData.accessToken;

    setPropertyInfo(updatedInfo);
    try {

      const updateProfileEndpoint = "http://localhost:8000/api/properties/${}";
      const response = await axios.patch(updateProfileEndpoint, updatedInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const updatedPropertyInfo: PropertyInfo = response.data;
      setPropertyInfo(updatedPropertyInfo);
    } catch (error) {
      console.error('Error updating property info:', error);
      // Handle error gracefully, e.g., show a message to the user
    }
    // Add logic to persist changes, e.g., update the state, local storage, or send to a server
  };

  return (
    <div className="property-profile-landing-page">
      <div className="property-info-section">
        <h1 data-testid="property-title">{propertyInfo.title} Profile</h1>
        <PropertyInfoForm
          propertyInfo={propertyInfo}
          onSave={handleSavePropertyInfo}
        />
      </div>
      <div className="condo-list-section">
        <h1>Condo List</h1>
        <Link to={`/CondoCreation`} state={{ title: propertyInfo.title }}>
          <button className="add-unit-button">Add Unit</button>
        </Link>
        <List
          data-testid="add-unit-page"
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
