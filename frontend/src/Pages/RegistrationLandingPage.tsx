import React from "react";
import SignUp from "../Components/Authentication/SignUp";
import "../Style/AuthenticationStyle/LoginAndRegistrationLandingPageStyle.css";

const RegistrationLandingPage = () => {
  return (
    <div
      data-testid="registration-container"
      className="registration-and-login-container"
    >
      <div className="registration-and-login-title-and-image-container">
        <h1>
          Sign Up <br />
          Now!
        </h1>
        <img src="Assets/signup.gif" alt="" />
      </div>
      <div className="registration-and-login-information-container">
        <div className="registration-and-login-information-content">
          <h2>Create Your Account</h2>
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default RegistrationLandingPage;
