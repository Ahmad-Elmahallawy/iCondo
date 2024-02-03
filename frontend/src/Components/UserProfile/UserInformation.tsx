import React, { useState, ChangeEvent } from "react";
import "../../Style/UserProfileStyle/UserInformationStyle.css";
import { FaPen } from "react-icons/fa"; // Assuming you have a library for icons

interface UserData {
  profilePicture: File | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const UserInformation: React.FC = () => {
  const defaultProfilePicturePath = "/Assets/default-profile-picture.png";

  const initialUserData: UserData = {
    profilePicture: null,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    password: "********",
  };

  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEditPictureClick = (): void => {
    const fileInput = document.getElementById("profilePictureInput");
    fileInput?.click();
  };

  const handleSaveClick = (): void => {
    setEditMode(false);
    // TODO: Save changes to the server or perform other actions
  };

  const handleCancelClick = (): void => {
    setUserData(initialUserData);
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
            value={userData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{userData.firstName}</span>
        )}
      </div>
      <div className="user-information-field">
        <label className="user-information-label">Last Name:</label>
        {editMode ? (
          <input
            className="user-information-input"
            type="text"
            value={userData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{userData.lastName}</span>
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
            value={userData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{userData.phone}</span>
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
