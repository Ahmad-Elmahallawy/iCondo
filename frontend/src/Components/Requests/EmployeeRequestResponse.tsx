// EmployeeRequestResponse.tsx
import React from "react";
// Import EnumRequestStatus if available
// import { EnumRequestStatus } from "../../path/to/EnumRequestStatus";

interface Props {
  requestId: string;
  currentStatus: string; // Assuming status is of type string
  onSubmit: (selectedStatus: string) => void;
}

const EmployeeRequestResponse: React.FC<Props> = ({
  requestId,
  currentStatus,
  onSubmit,
}) => {
  const handleUpdateStatus = (newStatus: string) => {
    onSubmit(newStatus);
  };

  return (
    <div>
      <p>Request ID: {requestId}</p>
      <p>Current Status: {currentStatus}</p>
      <button onClick={() => handleUpdateStatus("Pending Approval")}>
        Send for Approval
      </button>
      <button onClick={() => handleUpdateStatus("Complete")}>Complete</button>
      {/* Add more buttons for other statuses as needed */}
    </div>
  );
};

export default EmployeeRequestResponse;
