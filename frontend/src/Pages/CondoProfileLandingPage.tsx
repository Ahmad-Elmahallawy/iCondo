import React, { useState } from "react";
import "../Style/LandingPageStyle/CondoProfileLandingPage.css";

type CondoInfo = {
  condoId: string;
  netArea: string;
  occupantName: string;
  parkingSpotCount: string;
  lockerCount: string;
  bathrooms: string;
  bedrooms: string;
  condoType: string;
  lastRenovated: string;
};

const CondoProfileForm: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [condoInfo, setCondoInfo] = useState<CondoInfo>({
    condoId: "123",
    netArea: "123 Cruise Street, 1A3 1A3, Montreal, QC",
    occupantName: "Jane Doe",
    parkingSpotCount: "200",
    lockerCount: "200",
    bathrooms: "2",
    bedrooms: "2",
    condoType: "divided",
    lastRenovated: "2019",
  });

  // Create a temporary state to hold changes before saving
  const [tempInfo, setTempInfo] = useState<CondoInfo>(condoInfo);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTempInfo({ ...tempInfo, [name]: value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    setCondoInfo(tempInfo);
    setEditMode(false);
    // Here you would also send the updated data to the backend/server
  };

  const handleCancel = () => {
    setTempInfo(condoInfo); // Reset the temporary info to the last saved state
    setEditMode(false);
  };
  const renderInputField = (key: keyof CondoInfo, isEditMode: boolean) => {
    const label =
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");

    if (isEditMode) {
      return (
        <div key={key} className="input-container">
          <span className="input-label">{label}:</span>
          <input
            type="text"
            id={key}
            name={key}
            value={tempInfo[key]}
            onChange={handleInputChange}
            className="editModeInput"
          />
        </div>
      );
    } else {
      return (
        <div key={key} className="input-container">
          <span className="input-label">{label}:</span>
          <span className="input-value">{condoInfo[key]}</span>
        </div>
      );
    }
  };

  return (
    <div className="main-container">
      <div className="condoProfileContainer">
        <h2>Condo Profile</h2>
        <form onSubmit={editMode ? handleSave : undefined}>
          {Object.keys(condoInfo).map((key) =>
            renderInputField(key as keyof CondoInfo, editMode)
          )}
          {editMode && (
            <div className="buttons-container">
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
            </div>
          )}
        </form>
        {!editMode && (
          <div className="buttons-container">
            <button onClick={handleEdit} className="editButton">
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CondoProfileForm;
