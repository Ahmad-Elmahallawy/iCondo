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
      console.log(user.id, user.accessToken);
      const getCondoId = await api.userCondoList.getUserCondo(
        user.id,
        user.accessToken
      );

      const getPropertyId = await api.properties.getCondoProperty(
        getCondoId.data[0].condo.id,
        user.accessToken
      );

      const getCompanyId = await api.companies.getCompanyProperty(
        getPropertyId.data[0].id,
        user.accessToken
      );

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
      {/*TODO: loop through an array of requests from an API and pass the subject and status to the below component*/}
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
