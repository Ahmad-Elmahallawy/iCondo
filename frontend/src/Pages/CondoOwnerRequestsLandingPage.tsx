import React, { useState } from "react";
import OwnerRequestSubject from "../Components/Requests/OwnerRequestSubject";
import "../Style/LandingPageStyle/CondoOwnerRequestsLandingPageStyle.css";
import OwnerRequestModal from "../Components/Requests/OwnerRequestModal";

const CondoOwnerRequestsLandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="condo-owner-landing-container">
      <div className="condo-owner-heading">
        <h2>My Requests</h2>
        <button onClick={handleModalOpen}>Compose New Request</button>
      </div>
      {/*TODO: loop through an array of requests from an API and pass the subject and status to the below component*/}
      <OwnerRequestSubject />
      <OwnerRequestModal open={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default CondoOwnerRequestsLandingPage;
