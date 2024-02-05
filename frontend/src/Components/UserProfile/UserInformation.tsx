import React, { useState, ChangeEvent, useEffect } from "react";
import "../../Style/UserProfileStyle/UserInformationStyle.css";
import { FaPen } from "react-icons/fa"; // Assuming you have a library for icons

interface UserData {
  profilePicture: File | null;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}

interface UserInformationProps {
  data: UserData;
}

const UserInformation: React.FC<UserInformationProps> = ({ data }) => {
  const defaultProfilePicturePath = "/Assets/default-profile-picture.png";

  const [userData, setUserData] = useState<UserData>(data);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    // Set user data when the component mounts
    setUserData(data);
  }, [data]);

  const handleEditPictureClick = (): void => {
    const fileInput = document.getElementById("profilePictureInput");
    fileInput?.click();
  };

  const handleSaveClick = (): void => {
    setEditMode(false);
    // TODO: Save changes to the server or perform other actions
  };

  const handleCancelClick = (): void => {
    setEditMode(false);
  };

  const handleChange = (field: string, value: string): void => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleProfilePictureChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        profilePicture: file,
      }));
    }
  };

  return (
    <div className={`user-information-container ${editMode ? 'edit-mode' : ''}`}>
      <div className="user-information-profile-container">
        <img
          className="user-information-profile-picture"
          src={
            userData.profilePicture
              ? URL.createObjectURL(userData.profilePicture)
              : defaultProfilePicturePath
          }
          alt="Profile"
        />
        {editMode && (
          <div
            className="user-information-edit-picture"
            onClick={handleEditPictureClick}
          >
            <FaPen />
          </div>
        )}
        <input
          type="file"
          id="profilePictureInput"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: "none" }}
        />
      </div>
      <h2 className="user-information-heading">My Profile</h2>
      <div className="user-information-field">
        <label className="user-information-label">First Name:</label>
        {editMode ? (
          <input
            className="user-information-input"
            type="text"
            value={userData.first_name}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{userData.first_name}</span>
        )}
      </div>
      <div className="user-information-field">
        <label className="user-information-label">Last Name:</label>
        {editMode ? (
          <input
            className="user-information-input"
            type="text"
            value={userData.last_name}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{userData.last_name}</span>
        )}
      </div>
      <div className="user-information-field">
        <label className="user-information-label">Email:</label>
        {editMode ? (
          <input
            className="user-information-input"
            type="email"
            value={userData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{userData.email}</span>
        )}
      </div>
      <div className="user-information-field">
        <label className="user-information-label">Phone Number:</label>
        {editMode ? (
          <input
            className="user-information-input"
            type="tel"
            value={userData.phone_number}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{userData.phone_number}</span>
        )}
      </div>
      <div className="user-information-field">
        <label className="user-information-label">Password:</label>
        {editMode ? (
          <input
            className="user-information-input"
            type="password"
            value={userData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{userData.password}</span>
        )}
      </div>
      {editMode ? (
        <div>
          <button className="user-information-button" onClick={handleSaveClick}>
            Save Changes
          </button>
          <button
            className="user-information-button user-information-cancel-button"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button className="user-information-button" onClick={() => setEditMode(true)}>
          Edit
        </button>
      )}
    </div>
  );
};

export default UserInformation;
