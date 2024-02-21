import React, { useState } from "react";
import CondoInfoForm from "../Components/CondoProfile/CondoInfoForm";
import "../Style/CreatePropertyStyle/CreatePropertyLandingPageStyle.css";
import CreateProperty from "../Components/Property/CreateProperty";

const CreatePropertyLandingPage: React.FC = () => {

  return (
    <div className="main-container">
      <CreateProperty />
    </div>
  );
};

export default CreatePropertyLandingPage;
