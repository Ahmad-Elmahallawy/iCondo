import React, { useEffect, useState } from "react";
import "../../Style/RequestsStyle/EmployeeRequestSubjectStyle.css";
import axios from "axios";
import EmployeeRequestResponse from "./EmployeeRequestResponse";
import api from "../../api";
import LoadingScreen from "../Common/LoadingScreen";
import urls from "../../urls";

interface Request {
  requestType: string;
  status: string;
  id: string;
}

interface Notification {
  id: number;
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
          company[0]?.id,
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


      // Check if response data exists and has the id property
      if (response && response.data && response.data.id) {
        const notificationResponse = await axios.get<Notification[]>(
          `${urls.notifications.getNotification}`,
          {
            params: {
              where: {
                request: {
                  id: response.data.id,
                },
                user: {
                  id: response.data.user.id,
                },
                title: {
                  not: "CREATED",
                },
              },
            },
            headers: {
              Authorization: `Bearer ${userData.accessToken}`,
            },
          }
        );

        if (notificationResponse && notificationResponse.data) {
          const previousStatus = fetchedRequests.find(
            (request) => request.id === id
          )?.status;

          const newMessage = `Request status with id ${response.data.id} has been changed from ${previousStatus} to ${status}`;

          const editNotificationMsg = await axios.patch(
            `${urls.notifications.getNotification}/${
              notificationResponse.data[notificationResponse.data.length - 1].id
            }`,
            {
              message: newMessage,
            },
            {
              headers: {
                Authorization: `Bearer ${userData.accessToken}`,
              },
            }
          );
          // Update local state to reflect the changes
          setFetchedRequests((prevState) =>
            prevState.map((request) =>
              request.id === id ? { ...request, status: status } : request
            )
          );
        }
      }
    } catch (error) {
      console.error("Error handling request:", error);
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
