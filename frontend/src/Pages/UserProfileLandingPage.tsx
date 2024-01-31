import React from "react";
import "../Style/UserProfileStyle/UserProfilePageStyle.css";
import UserInformation from "../Components/UserProfile/UserInformation";

const UserProfilePage = () => {
  return (
    <div className="user-profile-container">
      <div className="myprofile-container">
          <UserInformation />
      </div>
      <div className="properties-and-requests-container">
        <div className="properties-content"></div>
        <div className="requests-content"></div>
      </div>
    </div>
  );
};

export default UserProfilePage;
