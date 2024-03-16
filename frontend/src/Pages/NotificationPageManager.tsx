import React from "react";
import "../Style/NotificationPageManagerStyle/NotiPageManagerStyle.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <h1 className="notifications-heading">Notifications</h1>
      <div className="notifications-box">
        <div className="notification-item">
          <span>New Request: Leaky faucet help</span>
          <button className="close-btn">×</button>
        </div>
        <div className="notification-item">
          <span>New Request: Garbage Collection</span>
          <button className="close-btn">×</button>
        </div>
        <div className="notification-item">
          <span>New Request: Move in Approval</span>
          <button className="close-btn">×</button>
        </div>
      </div>
    </div>
  );
};

export default App;
