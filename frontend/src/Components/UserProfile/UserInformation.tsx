import React, { useState, ChangeEvent, useEffect } from "react";
import "../../Style/UserProfileStyle/UserInformationStyle.css";
import { FaPen } from "react-icons/fa";
import api from "../../api";
import UserInfoFields from "./UserInfoFields";
import axios from "axios";

export interface UserData {
  profilePicture: File | null;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  id: number;
}

interface UserInformationProps {
  data: UserData;
}

const UserInformation: React.FC<UserInformationProps> = ({ data }) => {
  const defaultProfilePicturePath = "/Assets/default-profile-picture.png";
  console.log(data);

  const [userData, setUserData] = useState<UserData>(data);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  ); // New state to store the profile picture URL
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.userInformation.fetchUserDetails(
          data.id,
          user.accessToken
        );
        setUserData(response.data);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, [data]);

  const handleEditPictureClick = (): void => {
    const fileInput = document.getElementById("profilePictureInput");
    fileInput?.click();
  };

  const handleSaveClick = async (): Promise<void> => {
    try {
      await api.userInformation.handleSaveClick(userData);

      setSuccessMessage("User details updated successfully");
      setErrorMessage(null);
      if (userData.profilePicture) {
        const pictureFormData = new FormData();
        pictureFormData.append("file", userData.profilePicture);
        await api.userInformation.updateUserProfilePic(
          data.username,
          pictureFormData
        );
      }
      localStorage.setItem("userData", JSON.stringify(userData));
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

      // Update profilePictureUrl to show the newly selected image immediately
      const imageUrl = URL.createObjectURL(file);
      setProfilePictureUrl(imageUrl);
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
          src={profilePictureUrl || defaultProfilePicturePath}
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
      <UserInfoFields
        data={userData}
        editMode={editMode}
        handleChange={handleChange}
      />

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
