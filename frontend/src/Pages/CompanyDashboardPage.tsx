// DashboardPage.tsx
import React from 'react';
import SquareCard from '../Components/Dashboard/SquareCard';
import "../Style/Dashboard/CompanyDashboardStyle.css";

const DashboardPage: React.FC = () => {
    const RegisterEmployee = "/Assets/RegisterEmployee.png";
    const GenerateKey = "/Assets/GenerateKey.png";
    const CreateProperty = "/Assets/CreateProperty.png";
    const EmployeeList = "/Assets/EmployeeList.png";
    const RegistrationKeyList = "/Assets/RegistrationKeyList.png";
    const PropertiesList = "/Assets/PropertiesList.png";

    return (
      <div className="dashboard-page">
        <div className="dashboard">
          <div className= "row">
            <h2 className="page-title">Dashboard</h2>
          </div>
          <div className="row">
            <SquareCard title="Register Employee" icon= {RegisterEmployee} route="/RegisterEmployee" />
            <SquareCard title="Generate Key" icon={GenerateKey} route="/GenerateKey" />
            <SquareCard title="Create Property" icon={CreateProperty} route="/CreateProperty" />
          </div>
          <div className="row">
            <SquareCard title="Employees List" icon={EmployeeList} route="/EmployeeList" />
            <SquareCard title="Registration Key List" icon={RegistrationKeyList} route="/RegistrationKeyList" />
            <SquareCard title="Properties List" icon={PropertiesList} route="/PropertiesList" />
          </div>
        </div>
      </div>
    );
  };
  

export default DashboardPage;
