import React from "react";
import "../Style/LandingPageStyle/LoginAndRegistrationLandingPageStyle.css";
import LogIn from "../Components/Authentication/LogIn";

const LogInLandingPage = () => {
  return (
    <div className="registration-and-login-container">
      <div className="registration-and-login-title-and-image-container">
        <h1>Welcome to the Condo Management System</h1>
        <img src="Assets/login.gif" alt="" />
      </div>
      <div className="registration-and-login-information-container">
        <div className="registration-and-login-information-content">
          <h2>Sign in to your account</h2>
          <LogIn />
        </div>
      </div>
    </div>
  );
};

export default LogInLandingPage;
