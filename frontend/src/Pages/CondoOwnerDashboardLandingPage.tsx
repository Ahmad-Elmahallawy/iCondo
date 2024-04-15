import React from "react";
import IconCard from "../Components/CompanyDashboard/IconCard";
import "../Style/CompanyDashboard/CompanyDashboardLandingPageStyle.css";
import { useNavigate } from "react-router-dom";

const CondoOwnerDashboardPage: React.FC = () => {
  const Profile = "/Assets/profile.svg";
  const Financial_status = "/Assets/FinancialStatus.svg";
  const Condos = "/Assets/CreateProperty.svg";
  const Requests = "/Assets/PropertiesList.svg";
  const Calendar = "/Assets/calander.svg";

  // Check if the user is logged in
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const navigate = useNavigate(); // Navigation function from React Router

  if (user === "{}") {
    // Redirect to login page if not logged in
    navigate("/login");
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard">
        <div className="dashboard-row">
          <h2 className="page-title">Dashboard</h2>
        </div>
        <div className="dashboard-row">
          <IconCard title="My Profile" icon={Profile} route="/Profile" />
          <IconCard title="My Condos" icon={Condos} route="/MyCondos" />
          <IconCard title="Common Facilities Calendar" icon={Calendar} route="/Calendar" />
        </div>
        <div className="dashboard-row">
          <IconCard
            title="My Financial Status"
            icon={Financial_status}
            route="/"
          />
          {/*TODO: ADD ROUTE*/}
          <IconCard
            title="My Requests"
            icon={Requests}
            route="/OwnerRequests"
          />
        </div>
      </div>
    </div>
  );
};

export default CondoOwnerDashboardPage;
