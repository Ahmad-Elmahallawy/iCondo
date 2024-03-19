// EmployeeRequestSubject.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Request {
  requestType: string;
}

interface EmployeeRequestSubjectProps {
  onClick: (request: Request) => void;
}

const EmployeeRequestSubject: React.FC<EmployeeRequestSubjectProps> = ({ onClick }) => {
  const [fetchedRequests, setFetchedRequests] = useState<Request[]>([]);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/requests`, {
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
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="employee-request-container">
      <p>
        <b>Subject</b>: {request.requestType}
      </p>
      {/* TODO: Update Unread status to Read if clicked on or Responded when the employee submits a response */}
      <p>Unread</p> 
    </div>
  );

};

export default EmployeeRequestSubject;
