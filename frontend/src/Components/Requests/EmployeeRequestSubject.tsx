import React, { useEffect, useState } from "react";
import "../../Style/RequestsStyle/EmployeeRequestSubjectStyle.css";
import axios from "axios";
import EmployeeRequestResponse from "./EmployeeRequestResponse";
import api from "../../api";

interface Request {
  requestType: string;
  status: string;
  id: string;
}

const EmployeeRequestSubject = () => {
  const [fetchedRequests, setFetchedRequests] = useState<Request[]>([]);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const company = JSON.parse(localStorage.getItem("companyDetails") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.requests.getEmployeeRequest(
          company[0]?.company?.id,
          userData.accessToken
        );
        if (response !== undefined) {
          setFetchedRequests(response.data);
        } else {
          console.error("Response is undefined");
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (status: string) => {
    console.log("here");
  };

  return (
    <div>
      {fetchedRequests.map((request, index) => (
        <div key={index} className="employee-request-container">
          <p>
            <b>Subject</b>: {request.requestType}
          </p>
          {/* TODO: Update Unread status to Read if clicked on or Responded when the employee submits a response */}
          <p>{request.status}</p>
          <EmployeeRequestResponse
            requestId={request.id}
            onSubmit={handleSubmit}
            currentStatus={request.status}
          />
        </div>
      ))}
    </div>
  );
};

export default EmployeeRequestSubject;
