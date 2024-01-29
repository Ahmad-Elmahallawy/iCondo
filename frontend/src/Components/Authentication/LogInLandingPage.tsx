import React from "react";
import "../../Style/AuthenticationStyle/RegistrationLandingPageStyle.css";
import LogIn from "./LogIn";

const LogInLandingPage = () => {
  return (
    <div className="registration-container">
      <div className="registration-title-and-image-container">
        <h1>Welcome to the Condo Management System</h1>
        <img src="Assets/registration-room.png" alt="" />
      </div>
      <div className="registration-information-container">
        <div className="registration-information-content">
          <h2>Sign in to your account</h2>
          <LogIn />
        </div>
      </div>
    </div>
  );
};

export default LogInLandingPage;
