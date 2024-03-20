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

const NotificationUser: React.FC = () => {
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
    // Split the request type by underscores
    const words = requestType.split("_");

    // Capitalize the first letter of each word
    const formattedType = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "); // Join the words back together with spaces

    return formattedType;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Notification[]>(
          `${urls.notifications.getNotification}`,
          {
            params: {
              where: {
                user: {
                  id: user.id,
                },
                title: {
                  not: "CREATED",
                },
              },
            },
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        console.log(response.data);

        setNotifications(response.data);
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
            return (
              <div className="notification-item" key={notification.id}>
                <span>
                  A New Update Regarding Your Request:
                  <strong>{formatRequestType(notification.message)}</strong>
                </span>
                <button
                  className={`close-btn`}
                  onClick={() => handleToggle(index)}
                >
                  {"×"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationUser;
