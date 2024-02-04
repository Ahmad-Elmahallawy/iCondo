import React from "react";
import "../Style/UserProfileStyle/UserProfilePageStyle.css";
import UserInformation from "../Components/UserProfile/UserInformation";
import Properties from "../Components/UserProfile/UserProperties";
import Requests from "../Components/UserProfile/UserRequests";

const UserProfilePage = () => {
  return (
    <div className="user-profile-container">
      <div className="my-profile-container">
        <UserInformation />
      </div>
      <div className="properties-and-requests-container">
        <div className="properties-content">
          <Properties />
        </div>
        <div className="requests-content">
          <Requests />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
