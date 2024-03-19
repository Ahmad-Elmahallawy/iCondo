import React, { useState, useEffect } from "react";
import PropertyInfoField from "./PropertyInfoField"; // Adjust the path as needed
import "../../Style/PropertyProfileStyle/PropertyInfoFormStyle.css";
import CondoFilesModal from "./CondoFilesModal";
import api from "../../api";

interface PropertyInfo {
  name: string;
  address: string;
  unitCount: string;
  parkingCount: string;
  lockerCount: string;
  id: string;
}

type PropertyInfoFormProps = {
  propertyInfo: PropertyInfo;
  onSave: (info: PropertyInfo) => void;
};

const PropertyInfoForm: React.FC<PropertyInfoFormProps> = ({
  propertyInfo: initialPropertyInfo,
  onSave,
}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [tempInfo, setTempInfo] = useState<PropertyInfo>(initialPropertyInfo);
  const [isCondoFilesOpen, setIsCondoFilesOpen] = useState(false);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

  // Synchronize internal state with prop changes
  useEffect(() => {
    setTempInfo(initialPropertyInfo);
  }, [initialPropertyInfo]);

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
    setTempInfo(initialPropertyInfo);
    setEditMode(false);
  };

  const handleCondoFileModal = (event: React.FormEvent) => {
    event.preventDefault();
    setIsCondoFilesOpen(true);
  };

  const handleRemovePropertyClick = () => {
    setShowRemoveConfirmation(true);
    document.body.classList.add("modal-open");
  };

  const handleRemoveCancel = () => {
    setShowRemoveConfirmation(false);
    document.body.classList.remove("no-scroll");
  };

  const handleRemoveConfirm = async () => {
    try {
      const response = await api.properties.deleteProperty(
        initialPropertyInfo.id
      );
      console.log(response.data); // Or handle the response as needed
    } catch (error) {
      console.error("Error removing property:", error);
    } finally {
      setShowRemoveConfirmation(false);
      document.body.classList.remove("no-scroll");
    }
  };

  const handleCloseModal = () => {
    setShowRemoveConfirmation(false);
    document.body.classList.remove("modal-open");
  };

  return (
    <div className="property-form-container">
      <button
        onClick={handleRemovePropertyClick}
        className="remove-property-button"
      >
        Remove Property
      </button>

      {showRemoveConfirmation && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="remove-confirmation-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Remove Property Confirmation</h2>
            <p>
              Are you sure you want to remove "{initialPropertyInfo.name}" from
              your ownership?
            </p>
            <div className="modal-buttons">
              <button onClick={handleRemoveConfirm} className="confirm-button">
                Remove
              </button>
              <button onClick={handleRemoveCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={isEditMode ? handleSave : undefined}>
        {Object.keys(initialPropertyInfo).map(
          (key) =>
            //Hide the updatedAt, id and createdAt input fields
            key !== "updatedAt" &&
            key !== "id" &&
            key != "createdAt" && (
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
            )
        )}
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
              <button
                onClick={handleEdit}
                className="edit-button"
                data-testid="update-property-button"
              >
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
