// EmployeeRequestsLandingPage.tsx
import React, { useState } from "react";
import KeyGeneration from "../Components/Requests/KeyGeneration";
import "../Style/LandingPageStyle/EmployeeRequestsLandingPageStyle.css";

const EmployeeRequestsLandingPage = () => {
  const [selectedUserName, setSelectedUserName] = useState<string>("");

  const handleUserItemClick = (userId: number, userName: string) => {
    setSelectedUserName(userName);
  };

  return (
    <div className="employee-requests-landing-page-container">
      <div className="employee-requests-key-generation">
        <KeyGeneration userName={selectedUserName} />
      </div>
    </div>
  );
};

export default EmployeeRequestsLandingPage;
