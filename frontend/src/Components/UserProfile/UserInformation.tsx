import React, { useState, ChangeEvent, useEffect } from "react";
import "../../Style/UserProfileStyle/UserInformationStyle.css";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import { log } from "console";

interface UserData {
  profilePicture: File | null;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  _id: string;
}

interface UserInformationProps {
  data: UserData;
}

const UserInformation: React.FC<UserInformationProps> = ({ data }) => {
  const defaultProfilePicturePath = "/Assets/default-profile-picture.png";

  const [userData, setUserData] = useState<UserData>(data);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  const handleEditPictureClick = (): void => {
    const fileInput = document.getElementById("profilePictureInput");
    fileInput?.click();
  };

  const handleSaveClick = async (): Promise<void> => {
    try {
      await axios.patch("http://localhost:8000/api/users", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("User details updated successfully");
      setErrorMessage(null);

      if (userData.profilePicture) {
        const pictureFormData = new FormData();
        pictureFormData.append("file", userData.profilePicture);
        await axios.post(
          `http://localhost:8000/api/files/abc`,
          pictureFormData
        );
      }
    } catch (error) {
      setErrorMessage("Error updating user details");
      setSuccessMessage(null);
    } finally {
      setEditMode(false);
    }
  };

  const handleCancelClick = (): void => {
    setEditMode(false);
    setSuccessMessage(null);
    setErrorMessage(null);
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
    <div
      className={`user-information-container ${editMode ? "edit-mode" : ""}`}
    >
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

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
        <label className="user-information-label">Username:</label>
        {editMode ? (
          <input
            className="user-information-input"
            type="text"
            value={userData.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{userData.username}</span>
        )}
      </div>

      <div className="user-information-field">
        <label className="user-information-label">First Name:</label>
        {editMode ? (
          <input
            className="user-information-input"
            type="text"
            value={userData.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
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
            onChange={(e) => handleChange("last_name", e.target.value)}
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
            onChange={(e) => handleChange("phone_number", e.target.value)}
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
        <button
          className="user-information-button"
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default UserInformation;
