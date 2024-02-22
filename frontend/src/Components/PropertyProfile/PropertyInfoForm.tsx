import React, { useState } from "react";
import PropertyInfoField from "./PropertyInfoField"; // Adjust the path as needed
import "../../Style/PropertyProfileStyle/PropertyInfoFormStyle.css";
import CondoFilesModal from "./CondoFilesModal";

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

const PropertyInfoForm: React.FC<PropertyInfoFormProps> = ({
  propertyInfo,
  onSave,
}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [tempInfo, setTempInfo] = useState<PropertyInfo>(propertyInfo);
  const [isCondoFilesOpen, setIsCondoFilesOpen] = useState(false);

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

  const handleCondoFileModal = (event: React.FormEvent) => {
    event.preventDefault();
    setIsCondoFilesOpen(true);
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
            <>
              {" "}
              <button onClick={handleEdit} className="edit-button">
                Edit
              </button>
              <button
                onClick={handleCondoFileModal}
                className="view-condo-files-button"
              >
                View Condo Files
              </button>
            </>
          )}
        </div>
      </form>
      <CondoFilesModal
        isCondoFilesOpen={isCondoFilesOpen}
        handleClose={() => setIsCondoFilesOpen(false)}
      />
    </div>
  );
};

export default PropertyInfoForm;
