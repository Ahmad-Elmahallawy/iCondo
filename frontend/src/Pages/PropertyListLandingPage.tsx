// PropertyListLandingPage.tsx
import React from "react";
import List from "../Components/Common/List";
import PropertyComponent from "../Components/Property/Property";
import properties from "../Components/Property/Properties.json";
import "../Style/LandingPageStyle/PropertyListLandingPageStyle.css";

interface Property {
  id: number;
  title: string;
  address: string;
  imageUrl: string;
  unitCount: string;
  parkingSpotCount: string;
  lockerCount: string;
}

const PropertyListLandingPage = () => {
  const handlePropertyClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log("Event:", event.target);
  };

  // Map properties to include only required fields
  const mappedProperties: Property[] = properties.map((property) => ({
    id: property.id,
    title: property.title,
    address: property.address,
    imageUrl: property.imageUrl,
    unitCount: property.unitCount,
    parkingSpotCount: property.parkingSpotCount,
    lockerCount: property.lockerCount,
  }));

  return (
    <div className="property-list-page" data-testid="property-list-page">
      <h1>Properties List</h1>
      <List
        items={mappedProperties} // Use the mappedProperties array
        renderItem={(property) => (
          <PropertyComponent
            key={property.id}
            property={property}
            onClick={handlePropertyClick} // Pass property and event handler
          />
        )}
      />
    </div>
  );
};

export default PropertyListLandingPage;
