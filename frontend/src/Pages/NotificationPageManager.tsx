import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/NotificationPageManagerStyle/NotiPageManagerStyle.css";
import api from "../api";
import urls from "../urls";

interface Notification {
  id: number;
  message: string;
  title: string;
  user: {
    id: number;
  };
  // Add other properties as needed
}

const App: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [notifications, setNotifications] = useState<Notification[]>([]); // Change type to Notification[]

  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const company = JSON.parse(localStorage.getItem("companyDetails") || "{}");

  // Function to format the request type
  const formatRequestType = (requestType: string) => {
    // Remove underscores and capitalize the first letter of each word
    return requestType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Notification[]>(
          `${urls.notifications.getNotification}`,
          {
            params: {
              where: {
                message: {
                  contains: `\"company\":{\"id\":${company[0].id}}`,
                },
              },
            },
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );

        // Extracting only the request type from the message
        const processedNotifications = response.data.map((notification) => ({
          ...notification,
          message: formatRequestType(
            JSON.parse(notification.message).requestType
          ), // Formatting request type
        }));
        setNotifications(processedNotifications);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleToggle = async (index: number) => {
    try {
      // Update the state to show the check icon
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = true;
      setCheckedItems(newCheckedItems);

      // Delete the notification from the server
      await axios.delete(
        `${urls.notifications.deleteNotification}/${notifications[index].id}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      setNotifications((prevNotifications) =>
        prevNotifications.filter((_, i) => i !== index)
      );
    } catch (error) {
      console.error("Error handling toggle:", error);
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-box">
        <h1 className="notifications-heading">Notifications</h1>

        <div className="notification-container">
          {notifications.map((notification, index) => {
            if (
              user.roles.includes("manager") &&
              (notification.message === "Access Request" ||
                notification.message === "Deficiency Report" ||
                notification.message === "Violation Report" ||
                notification.message === "Question")
            ) {
              return (
                <div className="notification-item" key={notification.id}>
                  <span>
                    A new request has been made by user with id:{" "}
                    {notification.user.id}:{" "}
                    <strong>{notification.message}</strong>
                  </span>
                  <button
                    className={`close-btn`}
                    onClick={() => handleToggle(index)}
                  >
                    {"×"}
                  </button>
                </div>
              );
            } else if (
              user.roles.includes("operator") &&
              !(
                notification.message === "Access Request" ||
                notification.message === "Deficiency Report" ||
                notification.message === "Violation Report" ||
                notification.message === "Question"
              )
            ) {
              return (
                <div className="notification-item" key={notification.id}>
                  <span>
                    A new request has been made by user with id:{" "}
                    {notification.user.id}:{" "}
                    <strong>{notification.message}</strong>
                  </span>
                  <button
                    className={`close-btn ${
                      checkedItems[index] ? "checked" : ""
                    }`}
                    onClick={() => handleToggle(index)}
                  >
                    {checkedItems[index] ? "✓" : "×"}
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
