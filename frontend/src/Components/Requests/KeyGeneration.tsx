import React from "react";
import "../../Style/RequestsStyle/KeyGenerationStyle.css";
const KeyGeneration = () => {
  return (
    <div className="key-generation-container">
      <div className="key-generation-header">
        <h1>Generate Key</h1>
      </div>
      <div className="key-generation-content">
        <div className="key-generation-user-result">
          <p>User:</p>
          <p>[Name Here]</p>
        </div>
        <div className="key-generation-two-buttons">
          <button>Condo Owner</button>
          <button>Rental User</button>
        </div>
        {/*button for generating key here*/}
        <div className="key-generation-submission">
          <button>Send Registration Key to User</button>
        </div>
      </div>
    </div>
  );
};

export default KeyGeneration;
