import React, { useState } from "react";
import CondoInfoForm from "../Components/CondoProfile/CondoInfoForm";
import "../Style/CreatePropertyStyle/CreatePropertyLandingPageStyle.css";
import CreateProperty from "../Components/Property/CreateProperty";

// CreatePropertyLandingPage Component:
// This component represents the landing page for creating a new property.
// It renders the CreateProperty component from "../Components/Property/CreateProperty".
// The component does not manage any local state.
const CreatePropertyLandingPage: React.FC = () => {

  return (
    <div className="main-container">
      <CreateProperty />
    </div>
  );
};

export default CreatePropertyLandingPage;
