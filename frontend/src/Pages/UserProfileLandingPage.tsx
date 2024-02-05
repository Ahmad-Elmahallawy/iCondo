import React from "react";
import { Navigate } from "react-router-dom";
import "../Style/UserProfileStyle/UserProfilePageStyle.css";
import UserInformation from "../Components/UserProfile/UserInformation";
import Properties from "../Components/UserProfile/UserProperties";
import Requests from "../Components/UserProfile/UserRequests";

const UserProfilePage = () => {
  // Check if the user is logged in
  const userDataString = localStorage.getItem("userData");

  if (!userDataString) {
    // Redirect to login page if not logged in
    return <Navigate to="/Login" />;
  }

  // Parse the userDataString into a JavaScript object
  const userData = JSON.parse(userDataString);

  return (
    <div
      data-testid="user-profile-container"
      className="user-profile-container"
    >
      <div className="my-profile-container">
        <UserInformation data={userData} />
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
