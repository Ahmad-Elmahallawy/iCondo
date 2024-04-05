import React from 'react';
import IconCard from '../Components/CompanyDashboard/IconCard';
import "../Style/CompanyDashboard/CompanyDashboardLandingPageStyle.css";
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const Register_employee = "/Assets/RegisterEmployee.svg";
  const Create_property = "/Assets/CreateProperty.svg";
  const Employee_list = "/Assets/EmployeeList.svg";
  const Properties_list = "/Assets/PropertiesList.svg";
  const Costs = "/Assets/costs.svg"
  const Status = "/Assets/status.svg"
  const Annual_report = "/Assets/annualReport.svg"
  const Operational_budget = "/Assets/operationalBudget.svg"

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
          <IconCard title="Register Employee" icon={Register_employee} route="/RegisterEmployee" />
          <IconCard title="Common Facilities Status" icon={Status} route="/FacilitiesStatus" />
          <IconCard title="Create Property" icon={Create_property} route="/CreateProperty" />
          <IconCard title="Costs" icon={Costs} route="/Costs" />
        </div>
        <div className="dashboard-row">
          <IconCard title="Employees List" icon={Employee_list} route="/EmployeeList" />
          <IconCard title="Anunal Report" icon={Annual_report} route="/AnnualReport" />
          <IconCard title="Properties List" icon={Properties_list} route="/PropertiesList" />
          <IconCard title="Operational Budget Report" icon={Operational_budget} route="/BudgetReport" />
        </div>
      </div>
    </div>
  );
};


export default DashboardPage;
