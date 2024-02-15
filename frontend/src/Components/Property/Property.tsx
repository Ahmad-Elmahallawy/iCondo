import React from "react";
import "../../Style/PropertyListStyle/PropertyStyle.css";

interface Property {
  id: number;
  title: string;
  address: string;
  rep: string; 
  image_url: string;
}

const PropertyComponent: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <div className="property-container">
      <img
        src={property.image_url}
        alt={property.title}
        className="property-image"
      />
      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-address">{property.address}</p>
        <span className="property-rep">Title Representative: {property.rep}</span>
      </div>
    </div>
  );
};

export default PropertyComponent;