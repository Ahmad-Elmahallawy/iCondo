// KeyGeneration.tsx
import React from "react";
import "../../Style/RequestsStyle/KeyGenerationStyle.css";

interface KeyGenerationProps {
  userName?: string; // Marking userName as optional
}


// KeyGeneration Component:
// This component renders a form to generate registration keys for users.
// It accepts one prop:
// 1. userName: An optional string representing the name of the user. Defaults to "[Name Here]" if not provided.
// The component displays the user's name, two buttons to specify whether the user is a condo owner or a rental user,
// and a button to send the registration key to the user.
const KeyGeneration: React.FC<KeyGenerationProps> = ({
  userName = "[Name Here]",
}) => {
  return (
    <div className="key-generation-container">
      <div className="key-generation-header">
        <h1>Generate Key</h1>
      </div>
      <div className="key-generation-content">
        <div className="key-generation-user-result">
          <p>User:</p>
          <p>{userName}</p>
        </div>
        <div className="key-generation-two-buttons">
          <button>Condo Owner</button>
          <button>Rental User</button>
        </div>
        <div className="key-generation-submission">
          <button>Send Registration Key to User</button>
        </div>
      </div>
    </div>
  );
};

export default KeyGeneration;
