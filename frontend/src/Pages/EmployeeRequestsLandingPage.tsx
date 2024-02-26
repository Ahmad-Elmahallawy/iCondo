// EmployeeRequestsLandingPage.tsx
import React, { useState } from "react";
import KeyGeneration from "../Components/Requests/KeyGeneration";
import "../Style/LandingPageStyle/EmployeeRequestsLandingPageStyle.css";


// EmployeeRequestsLandingPage Component:
// This component represents the landing page for employee requests management.
// It renders the KeyGeneration component from "../Components/Requests/KeyGeneration".
// The component manages state for the selected user name using the useState hook.
// It contains a function handleUserItemClick that updates the selected user name when a user item is clicked.
// The selected user name is passed to the KeyGeneration component as a prop.
const EmployeeRequestsLandingPage = () => {


  return (
    <div className="employee-requests-landing-page-container">
      <div className="employee-requests-key-generation">
        <KeyGeneration  />
      </div>
    </div>
  );
};

export default EmployeeRequestsLandingPage;
