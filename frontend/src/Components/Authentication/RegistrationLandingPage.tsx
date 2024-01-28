import React from "react";
import SignUp from "./SignUp";
import "../../Style/AuthenticationStyle/RegistrationLandingPageStyle.css";

// TODO: have props.title (login or signup as Figma) when calling the component
const RegistrationLandingPage = (props: any) => {
  return (
    <div className="registration-container">
      <div className="registration-title-and-image-container">
        <h1>
          Sign Up <br />
          Now!
        </h1>
        <img src="Assets/registration-room.png" alt="" />
      </div>
      <div className="registration-information-container">
        <div className="registration-information-content">
          <h2>Create Your Account</h2>
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default RegistrationLandingPage;
