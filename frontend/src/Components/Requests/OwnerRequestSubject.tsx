import React from "react";
import "../../Style/RequestsStyle/OwnerRequestSubjectStyle.css";

// TODO: pass props to subject and response
const OwnerRequestSubject = () => {
  return (
    <div className="owner-request-container">
      {/*TODO: replace Subject 1 and Awaiting Response with the actual subject and status*/}
      <p>
        <b>Subject</b>: Subject 1
      </p>
      <p>Awaiting Response</p>
    </div>
  );
};

export default OwnerRequestSubject;
