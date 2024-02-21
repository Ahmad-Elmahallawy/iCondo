// PropertyListLandingPage.tsx
import React from "react";
import List from "../Components/Common/List";
import PropertyComponent from "../Components/Property/Property";
import properties from "../Components/Property/Properties.json";
import "../Style/LandingPageStyle/PropertyListLandingPageStyle.css";


const PropertyListLandingPage = () => {
  return (
    <div className="property-list-page" data-testid="property-list-page">
      <h1>Properties List</h1>
      <List
        items={properties}
        renderItem={(property) => (
          <PropertyComponent key={property.id} property={property} />
        )}
      />
    </div>
  );
};

export default PropertyListLandingPage;
