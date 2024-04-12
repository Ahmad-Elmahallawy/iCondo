import React, { useState } from "react";
import OwnerRequestSubject from "../Components/Requests/OwnerRequestSubject";
import "../Style/LandingPageStyle/CondoOwnerRequestsLandingPageStyle.css";
import OwnerRequestModal from "../Components/Requests/OwnerRequestModal";
import axios from "axios";
import api from "../api";
import { log } from "console";

const CondoOwnerRequestsLandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmitModal = async (subject: string) => {
    try {

      const getCompanyId = await api.companies.getCompanyProperty(
        user.propertyId,
        user.accessToken
      );
      console.log("here 2");
      if (subject === "moving_in" || subject === "moving_out") {
        const sentRequest = await api.requests.postOwnerRequest(
          getCompanyId[0].id,
          user.id,
          "move",
          subject,
          user.accessToken
        );
      } else if (subject === "question") {
        const sentRequest = await api.requests.postOwnerRequest(
          getCompanyId[0].id,
          user.id,
          "question",
          subject,
          user.accessToken
        );
      } else {
        const sentRequest = await api.requests.postOwnerRequest(
          getCompanyId[0].id,
          user.id,
          "any",
          subject,
          user.accessToken
        );
      }

      window.location.reload();
      // Handle the response
    } catch (error) {
      console.error("Error fetching condo ID:", error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  return (
    <div className="condo-owner-landing-container">
      <div className="condo-owner-heading">
        <h2>My Requests</h2>
        <button onClick={handleModalOpen}>Compose New Request</button>
      </div>
      <OwnerRequestSubject />
      <OwnerRequestModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmitModal}
      />
    </div>
  );
};

export default CondoOwnerRequestsLandingPage;
