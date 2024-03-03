import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Enables navigation to different routes
import CondoInfoField from "./CondoInfoField"; // Custom input field component for condo information
import "../../Style/CondoProfileStyle/CondoInfoFormStyle.css";
import { log } from "console";

// Props type definition for the component
interface CondoInfo {
  unitNumber: string;
  condoId: string;
  netArea: string;
  occupantName: string;
  condoFee: string;
}

// Component props including condoInfo object and onSave callback function
type CondoInfoFormProps = {
  condoInfo: CondoInfo;
  onSave: (info: CondoInfo) => void;
};

// CondoInfoForm Component:
// This component is responsible for rendering a form to display and edit condo information.
// It accepts two props:
// 1. condoInfo: An object containing condo information such as condoId, netArea, occupantName, bathrooms, bedrooms, condoType, and lastRenovated.
// 2. onSave: A function that is called to save updated condo information.
// The component renders input fields for each condo information property, allowing users to edit them.
// Users can switch between view and edit modes, and there are buttons to save changes, cancel edits, and create a registration key.

const CondoInfoForm: React.FC<CondoInfoFormProps> = ({ condoInfo, onSave }) => {
  const [isEditMode, setEditMode] = useState(false); // State to manage edit mode
  const [tempInfo, setTempInfo] = useState<CondoInfo>(condoInfo); // State to manage temporary condo information
  const navigate = useNavigate(); // to navigate when user clicks on "Create Registration Key" button

  // Updates tempInfo state based on form field changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTempInfo({ ...tempInfo, [name]: value });
  };

  // Calls onSave prop with updated info and exits edit mode
  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(tempInfo);
    setEditMode(false);
  };

  // Navigates to a different route (e.g., key generation page)
  const handleRegistrationKey = () => {
    navigate("/GenerateKey", { state: tempInfo });
  };

  // Enters edit mode, allowing the user to modify form fields
  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    setEditMode(true);
  };

  // Reverts changes and exits edit mode
  const handleCancel = () => {
    setTempInfo(condoInfo);
    setEditMode(false);
  };

  // Renders the form, conditionally displaying input fields or text based on isEditMode
  return (
    <div className="condoProfileContainer">
      <h2>Condo Profile</h2>
      <form onSubmit={isEditMode ? handleSave : undefined}>
        {Object.keys(condoInfo).map(
          (key) =>
            key !== "condoId" && (
              <CondoInfoField
                key={key}
                name={key}
                label={
                  key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")
                }
                value={tempInfo[key as keyof CondoInfo]}
                isEditMode={isEditMode}
                onChange={handleInputChange}
              />
            )
        )}
        <div className="buttons-container">
          {isEditMode ? (
            <>
              <button type="submit" className="editModeButton">
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="cancelButton"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className="editButton">
                Edit
              </button>
              <button className="editButton" onClick={handleRegistrationKey}>
                Create Registration Key
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default CondoInfoForm;
