// CondoInfoForm.tsx
import React, { useState } from "react";
import CondoInfoField from "./CondoInfoField"; // Adjust the path as needed
import "../../Style/CondoProfileStyle/CondoInfoFormStyle.css";
import { log } from "console";

interface CondoInfo {
  condoId: string;
  netArea: string;
  occupantName: string;
  bathrooms: string;
  bedrooms: string;
  condoType: string;
  lastRenovated: string;
}

type CondoInfoFormProps = {
  condoInfo: CondoInfo;
  onSave: (info: CondoInfo) => void;
};

const CondoInfoForm: React.FC<CondoInfoFormProps> = ({ condoInfo, onSave }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [tempInfo, setTempInfo] = useState<CondoInfo>(condoInfo);

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
    setTempInfo(condoInfo);
    setEditMode(false);
  };

  return (
    <div className="condoProfileContainer">
      <h2>Condo Profile</h2>
      <form onSubmit={isEditMode ? handleSave : undefined}>
        {Object.keys(condoInfo).map((key) => (
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
        ))}
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
            <button onClick={handleEdit} className="editButton">
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CondoInfoForm;
