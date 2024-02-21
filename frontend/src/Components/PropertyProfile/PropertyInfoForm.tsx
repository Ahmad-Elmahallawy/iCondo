import React, { useState } from "react";
import PropertyInfoField from "./PropertyInfoField"; // Adjust the path as needed
import "../../Style/PropertyProfileStyle/PropertyInfoFormStyle.css";

interface PropertyInfo {
  title: string;
  address: string;
  unitCount: string;
  parkingSpotCount: string;
  lockerCount: string;
}

type PropertyInfoFormProps = {
  propertyInfo: PropertyInfo;
  onSave: (info: PropertyInfo) => void;
};

const PropertyInfoForm: React.FC<PropertyInfoFormProps> = ({ propertyInfo, onSave }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [tempInfo, setTempInfo] = useState<PropertyInfo>(propertyInfo);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTempInfo({ ...tempInfo, [name]: value });
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(tempInfo);
    setEditMode(false);
  };

  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    setEditMode(true);
  };

  const handleCancel = () => {
    setTempInfo(propertyInfo);
    setEditMode(false);
  };

  return (
    <div className="property-form-container">
      <form onSubmit={isEditMode ? handleSave : undefined}>
        {Object.keys(propertyInfo).map((key) => (
          <PropertyInfoField
            key={key}
            name={key}
            label={
              key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1")
            }
            value={tempInfo[key as keyof PropertyInfo]}
            isEditMode={isEditMode}
            onChange={handleInputChange}
          />
        ))}
        <div className="buttons-container">
          {isEditMode ? (
            <>
              <button type="submit" className="edit-mode-button">
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-button"
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleEdit} className="edit-button">
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PropertyInfoForm;
