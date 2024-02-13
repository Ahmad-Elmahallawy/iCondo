import React from "react";
import KeyGeneration from "../Components/Requests/KeyGeneration";
import "../Style/LandingPageStyle/EmployeeRequestsLandingPageStyle.css";

const EmployeeRequestsLandingPage = () => {
  return (
    <div className="employee-requests-landing-page-container">
      <div className="employee-requests-key-generation">
        <KeyGeneration />
      </div>
      <div className="employee-requests-user-list">
        <h1>here</h1>
      </div>
    </div>
  );
};

export default EmployeeRequestsLandingPage;
