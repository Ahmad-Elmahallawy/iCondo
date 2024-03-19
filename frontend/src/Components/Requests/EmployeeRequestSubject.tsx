import React, { useEffect, useState } from "react";
import "../../Style/RequestsStyle/EmployeeRequestSubjectStyle.css";
import axios from "axios";
import EmployeeRequestResponse from "./EmployeeRequestResponse";
import api from "../../api";
import LoadingScreen from "../Common/LoadingScreen";

interface Request {
  requestType: string;
  status: string;
  id: string;
}

const EmployeeRequestSubject = () => {
  const [fetchedRequests, setFetchedRequests] = useState<Request[]>([]);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const company = JSON.parse(localStorage.getItem("companyDetails") || "{}");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.requests.getEmployeeRequest(
          company[0]?.company?.id,
          userData.accessToken
        );
        if (response !== undefined) {
          setFetchedRequests(response.data);
        } else {
          console.error("Response is undefined");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (status: string, id: string) => {
    try {
      const response =
        status === "In Progress"
          ? await api.requests.editRequest(
              id,
              "In_Progress",
              userData.accessToken
            )
          : await api.requests.editRequest(
              id,
              "Complete",
              userData.accessToken
            );
      setFetchedRequests((prevState) =>
        prevState.map((request) =>
          request.id === id ? { ...request, status: status } : request
        )
      );
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  return (
    <div>
      {fetchedRequests.map((request, index) => {
        if (
          userData.roles[0] === "manager" &&
          (request.requestType === "access_request" ||
            request.requestType === "deficiency_report" ||
            request.requestType === "violation_report" ||
            request.requestType === "question")
        ) {
          return (
            <div key={index} className="employee-request-container">
              <p>
                <b>Subject</b>: {request.requestType}
              </p>
              <p>{request.status}</p>
              <EmployeeRequestResponse
                requestId={request.id}
                onSubmit={(status) => handleSubmit(status, request.id)}
                currentStatus={request.status}
              />
            </div>
          );
        } else if (userData.roles[0] !== "manager") {
          // Display different content for non-manager users
          return (
            <div key={index} className="employee-request-container">
              {/* Display content for non-manager users */}
              <p>
                <b>Subject</b>: {request.requestType}
              </p>
              <p>{request.status}</p>
              <EmployeeRequestResponse
                requestId={request.id}
                onSubmit={(status) => handleSubmit(status, request.id)}
                currentStatus={request.status}
              />
            </div>
          );
        }
        return null; // If neither condition is met
      })}
      {isLoading && <LoadingScreen />}
    </div>
  );
};

export default EmployeeRequestSubject;
