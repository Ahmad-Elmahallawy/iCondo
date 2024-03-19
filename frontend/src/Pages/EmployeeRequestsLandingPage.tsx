// EmployeeRequestsLandingPage.tsx
import React from "react";
import EmployeeRequestResponse from "../Components/Requests/EmployeeRequestResponse";
import "../Style/LandingPageStyle/EmployeeRequestsLandingPageStyle.css";
import api from "../api";

interface Props {
  requestId: number;
  currentStatus: string; // Assuming status is of type string
}

const EmployeeRequestsLandingPage: React.FC<Props> = ({ requestId, currentStatus }) => {
  const handleUpdateStatus = async (newStatus: string) => {
    try {
      // Update request status (this is just a filler rn - need to create some type of function in api.ts)
      await api.requests.updateRequestStatus(requestId, newStatus, "your_token_here");
      // Reload the page or update state as needed
      window.location.reload();
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <div className="employee-landing-container">
      <div className="employee-requests-response">
        <EmployeeRequestResponse
          requestId={requestId}
          currentStatus={currentStatus}
          onSubmit={(selectedStatus) => handleUpdateStatus(selectedStatus)}
        />
      </div>
    </div>
  );
};

export default EmployeeRequestsLandingPage;
