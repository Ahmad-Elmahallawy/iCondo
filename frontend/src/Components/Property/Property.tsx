// PropertyComponent.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Style/PropertyStyle/PropertyStyle.css";

interface Property {
  id: number;
  title: string;
  address: string;
  imageUrl: string;
  unitCount: string;
  parkingSpotCount: string;
  lockerCount: string;
}

interface PropertyComponentProps {
  property: Property;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; // Accept event parameter
}

const PropertyComponent: React.FC<PropertyComponentProps> = ({
  property,
  onClick,
}) => {
  const navigate = useNavigate();

  const handlePropertyClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    navigate(`/PropertyProfile/${property.id}`, { state: { property } });
  };

  return (
    <div
      className="property-container"
      data-testid="property-component"
      onClick={handlePropertyClick}
    >
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
