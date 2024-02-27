import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import List from "../Components/Common/List";
import PropertyComponent from "../Components/Property/Property";
import "../Style/LandingPageStyle/PropertyListLandingPageStyle.css";

interface Property {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  unitCount: string;
  parkingSpotCount: string;
  lockerCount: string;
}

const PropertyListLandingPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const companyData = JSON.parse(
    localStorage.getItem("companyDetails") || "{}"
  )[0];
  const token = userData.accessToken;

  useEffect(() => {
    // Fetch properties from backend when component mounts
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/properties",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set Authorization header with token
            },
            data: {
              company: {
                id: parseInt(companyData.company.id),
              },
            },
          }
        );

        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties(); // Call the fetchProperties function
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handlePropertyClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log("Event:", event.target);
  };

  return (
    <div className="property-list-page" data-testid="property-list-page">
      <h1>Properties List</h1>
      {properties.length > 0 ? (
        <List
          items={properties} // Use the fetched properties
          renderItem={(property) => (
            <PropertyComponent
              key={property.id}
              property={property}
              onClick={handlePropertyClick} // Pass property and event handler
            />
          )}
        />
      ) : (
        <h1>You Do Not Have Any Property</h1>
      )}
    </div>
  );
};

export default PropertyListLandingPage;
