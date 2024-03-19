// EmployeeRequestsLandingPage.tsx
import React, { useState } from "react";
import EmployeeRequestResponse from "../Components/Requests/EmployeeRequestResponse";
import "../Style/LandingPageStyle/EmployeeRequestsLandingPageStyle.css";

const EmployeeRequestsLandingPage = () => {
  return (
    <div className="employee-landing-container">
      <div className="employee-requests-response">
        <EmployeeRequestResponse />
      </div>
    </div>
  );
};

export default EmployeeRequestsLandingPage;
