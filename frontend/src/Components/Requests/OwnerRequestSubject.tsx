import React, { useEffect, useState } from "react";
import "../../Style/RequestsStyle/OwnerRequestSubjectStyle.css";
import axios from "axios";

interface Request {
  requestType: string;
  status: string;
}

// TODO: pass props to subject and response
const OwnerRequestSubject = () => {
  const [fetchedRequests, setFetchedRequests] = useState<Request[]>([]);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/requests", {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
          params: {
            where: {
              user: { id: userData.id },
            },
          },
        });
        setFetchedRequests(response.data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <div>
      {/*TODO: replace Subject 1 and Awaiting Response with the actual subject and status*/}
      {fetchedRequests ? (
        fetchedRequests.map((request, index) => (
          <div className="owner-request-container" key={index}>
            <p>
              <b>Subject</b>: {request.requestType}
            </p>
            <p>{request.status}</p>{" "}
          </div>
        ))
      ) : (
        <p>You Currently Do Not Have Any Requests</p>
      )}
    </div>
  );
};

export default OwnerRequestSubject;
