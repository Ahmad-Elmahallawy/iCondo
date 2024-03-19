// EmployeeRequestResponse.tsx
import React from "react";
// Import EnumRequestStatus if available
// import { EnumRequestStatus } from "../../path/to/EnumRequestStatus"; 

interface Props {
  requestId: number;
  currentStatus: string; // Assuming status is of type string
  onSubmit: (selectedStatus: string) => void;
}

const EmployeeRequestResponse: React.FC<Props> = ({ requestId, currentStatus, onSubmit }) => {
  const handleUpdateStatus = (newStatus: string) => {
    onSubmit(newStatus);
  };

  return (
    <div>
      <h2>Request ID: {requestId}</h2>
      <p>Current Status: {currentStatus}</p>
      <button onClick={() => handleUpdateStatus("In Progress")}>
        Start Progress
      </button>
      <button onClick={() => handleUpdateStatus("Pending Approval")}>
        Send for Approval
      </button>
      <button onClick={() => handleUpdateStatus("Complete")}>
        Complete
      </button>
      {/* Add more buttons for other statuses as needed */}
    </div>
  );
};

export default EmployeeRequestResponse;
