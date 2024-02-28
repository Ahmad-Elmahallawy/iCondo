// KeyGeneration.tsx
import React, { useState } from "react";
import "../../Style/RequestsStyle/KeyGenerationStyle.css";
import { useLocation } from "react-router-dom";

// KeyGeneration Component:
// This component renders a form to generate registration keys for users.
// The component displays the user's name, two buttons to specify whether the user is a condo owner or a rental user,
// and a button to send the registration key to the user.
const KeyGeneration = () => {
  const [registrationKey, setRegistrationKey] = useState(
    "No Key To Show Right Now"
  );
  const [userType, setUserType] = useState<"condoOwner" | "rentalUser" | null>(
    null
  ); // Track user type selection
  const location = useLocation();
  const condoId = location.state ? location.state.condoId : "";
  console.log(condoId);
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
    setRegistrationKey(result);
  };

  const handleGenerateKey = () => {
    // TODO: add API to link it to condo
  };

  const handleUserTypeSelect = (type: "condoOwner" | "rentalUser") => {
    setUserType(type);
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
