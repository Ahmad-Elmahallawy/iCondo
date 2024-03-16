import React, { useState } from "react";
import "../Style/NotificationPageManagerStyle/NotiPageManagerStyle.css";

const App: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const handleToggle = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="app">
      <h1 className="notifications-heading">Notifications</h1>
      <div className="notifications-box">
        <div className="notification-item">
          <span>New Request: Leaky faucet help</span>
          <button className="close-btn" onClick={() => handleToggle(0)}>
            {checkedItems[0] ? "✓" : "×"}
          </button>
        </div>
        <div className="notification-item">
          <span>New Request: Garbage Collection</span>
          <button className="close-btn" onClick={() => handleToggle(1)}>
            {checkedItems[1] ? "✓" : "×"}
          </button>
        </div>
        <div className="notification-item">
          <span>New Request: Move in Approval</span>
          <button className="close-btn" onClick={() => handleToggle(2)}>
            {checkedItems[2] ? "✓" : "×"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
