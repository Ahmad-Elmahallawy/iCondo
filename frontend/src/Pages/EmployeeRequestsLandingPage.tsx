// EmployeeRequestsLandingPage.tsx
import React from "react";
import EmployeeRequestResponse from "../Components/Requests/EmployeeRequestResponse";
import "../Style/LandingPageStyle/EmployeeRequestsLandingPageStyle.css";
import api from "../api";
import EmployeeRequestSubject from "../Components/Requests/EmployeeRequestSubject";

const EmployeeRequestsLandingPage = () => {
  return (
    <div className="employee-landing-container">
      <div className="condo-employee-heading">
        <h2>My Assigned Requests</h2>
      </div>
      <EmployeeRequestSubject />
    </div>
  );
};

export default EmployeeRequestsLandingPage;
