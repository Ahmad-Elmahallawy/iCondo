// LandingPage.tsx
import React, { useState } from "react"; // Imports React library and useState hook for component state management.
import CondoInfoForm from "../Components/CondoProfile/CondoInfoForm"; // Imports the CondoInfoForm component to be used within this landing page.
import "../Style/LandingPageStyle/CondoProfileLandingPageStyle.css"; // Imports CSS styles for the landing page.

// Initial state for the condo information, establishing the default values for the form.
const initialCondoInfo = {
  condoId: "123",
  netArea: "123 Cruise Street, 1A3 1A3, Montreal, QC",
  occupantName: "Jane Doe",
  propertyId: "330", // Correctly included
  parkingId: "4537", // Correctly included
  condoFee: "890", // Correctly included
  lockerId: "345", // Correctly included
};

// Functional component definition for LandingPage.
const LandingPage: React.FC = () => {
  // useState hook to manage the state of condoInfo based on the initialCondoInfo.
  const [condoInfo, setCondoInfo] = useState(initialCondoInfo);

  // Handler function to update the condoInfo state with the new information passed from CondoInfoForm.
  const handleSaveCondoInfo = (updatedInfo: typeof initialCondoInfo) => {
    setCondoInfo(updatedInfo);
    // Placeholder for additional logic to persist changes (e.g., API call to save the data).
  };

  // Renders the landing page container and includes the CondoInfoForm component, passing the current condoInfo state and the handler function as props.
  return (
    <div className="main-container">
      <CondoInfoForm condoInfo={condoInfo} onSave={handleSaveCondoInfo} />
    </div>
  );
};

export default LandingPage; // Exports the LandingPage component for use in other parts of the application.
