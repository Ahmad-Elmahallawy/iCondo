// EmployeeRequestResponse.tsx
import React from "react";
import "../../Style/RequestsStyle/EmployeeRequestResponseStyle.css";

interface Props {
  requestId: string;
  currentStatus: string; 
  onSubmit: (selectedStatus: string, requestId: string) => void;
}

const EmployeeRequestResponse: React.FC<Props> = ({
  requestId,
  currentStatus,
  onSubmit,
}) => {
  const handleUpdateStatus = (newStatus: string) => {
    onSubmit(newStatus, requestId);
  };

  return (
    <div className="request-response-container">
      <p>Request ID: {requestId}</p>
      <p>Current Status: {currentStatus}</p>
      <div className="employee-requests-buttons">
        <button onClick={() => handleUpdateStatus("In Progress")}>
          In Progress
        </button>

        <button onClick={() => handleUpdateStatus("Complete")}>Complete</button>
      </div>
    </div>
  );
};

export default EmployeeRequestResponse;
