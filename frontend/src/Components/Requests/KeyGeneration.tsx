// KeyGeneration.tsx
import React, { useState } from "react";
import { Axios } from "axios";
import "../../Style/RequestsStyle/KeyGenerationStyle.css";
import { useLocation } from "react-router-dom";

// KeyGeneration Component:
// This component renders a form to generate registration keys for users.
// The component displays the user's name, two buttons to specify whether the user is a condo owner or a rental user,
// and a button to send the registration key to the user.
const KeyGeneration = () => {
  const location = useLocation();

  const [registrationData, setRegistrationData] = useState({
    condoId: location.state ? location.state.condoId : "",
    registrationKey: "No Key To Show Right Now",
    userType: "condoOwner",
  });
  const { condoId, registrationKey, userType } = registrationData;

  // function to randomly generate a key of size 8
  const generateKeyValue = () => {
    let result = "",
      length = 8;

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    setRegistrationData({ ...registrationData, registrationKey: result }); // assign registration key to the use state and keep the rest of the results the same
  };

  const handleGenerateKey = () => {
    generateKeyValue(); // call the function to generate a random key that is unique

    const response = axios.post("http://localhost:8000/api/registrationKeys");
  };

  const handleUserTypeSelect = (type: "condoOwner" | "rentalUser") => {
    setRegistrationData({
      ...registrationData,
      userType: type,
    });
  };
  return (
    <div className="key-generation-container">
      <div className="key-generation-header">
        <h1>Generate Key for Condo with ID {condoId}</h1>
      </div>
      <div className="key-generation-content">
        <div className="key-generation-user-result">
          <p>Generated Key:</p>
          <p>{registrationKey}</p>
        </div>
        <div className="key-generation-two-buttons">
          <button
            onClick={() => handleUserTypeSelect("condoOwner")}
            className={userType === "condoOwner" ? "selected" : ""}
          >
            Condo Owner
          </button>
          <button
            onClick={() => handleUserTypeSelect("rentalUser")}
            className={userType === "rentalUser" ? "selected" : ""}
          >
            Rental User
          </button>
        </div>
        <div className="key-generation-submission">
          <button onClick={handleGenerateKey}>Generate Registration Key</button>
        </div>
      </div>
    </div>
  );
};

export default KeyGeneration;
