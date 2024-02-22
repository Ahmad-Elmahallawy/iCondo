import React from "react";
import "../../Style/PropertyStyle/PropertyStyle.css";

interface Property {
  id: number;
  title: string;
  address: string;
  imageUrl: string;
}

const PropertyComponent: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <div className="property-container" data-testid="property-component">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="item-image"
      />
      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-address">{property.address}</p>
      </div>
    </div>
  );
};

export default PropertyComponent;