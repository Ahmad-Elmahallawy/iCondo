import React from "react";
import "../../Style/PropertyProfileStyle/PropertyInfoFieldStyle.css";

interface PropertyInfoFieldProps {
  label: string;
  value: string;
  isEditMode: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

// Function to transform label string
const transformLabel = (label: string): string => {
  return label
    .replace(/_/g, " ") // Replace underscores with space
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

const PropertyInfoField: React.FC<PropertyInfoFieldProps> = ({
  label,
  value,
  isEditMode,
  onChange,
  name,
}) => {
  return (
    <div className="input-container">
      <span className="input-label">{transformLabel(label)}:</span>
      {isEditMode ? (
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="editModeInput"
        />
      ) : (
        <span className="input-value">{value}</span>
      )}
    </div>
  );
};

export default PropertyInfoField;
