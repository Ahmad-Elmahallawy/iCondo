import React from 'react';
import IconCard from '../Components/CompanyDashboard/IconCard';
import "../Style/CompanyDashboard/CompanyDashboardLandingPageStyle.css";

const DashboardPage: React.FC = () => {
    const Register_employee = "/Assets/RegisterEmployee.svg";
    const Generate_key = "/Assets/GenerateKey.svg";
    const Create_property = "/Assets/CreateProperty.svg";
    const Employee_list = "/Assets/EmployeeList.svg";
    const Registration_key_list = "/Assets/RegistrationKeyList.svg";
    const Properties_list = "/Assets/PropertiesList.svg";

    return (
      <div className="dashboard-page">
        <div className="dashboard">
          <div className= "dashboard-row">
            <h2 className="page-title">Dashboard</h2>
          </div>
          <div className="dashboard-row">
            <IconCard title="Register Employee" icon= {Register_employee} route="/RegisterEmployee" />
            <IconCard title="Generate Key" icon={Generate_key} route="/GenerateKey" />
            <IconCard title="Create Property" icon={Create_property} route="/CreateProperty" />
          </div>
          <div className="dashboard-row">
            <IconCard title="Employees List" icon={Employee_list} route="/EmployeeList" />
            <IconCard title="Registration Key List" icon={Registration_key_list} route="/RegistrationKeyList" />
            <IconCard title="Properties List" icon={Properties_list} route="/PropertiesList" />
          </div>
        </div>
      </div>
    );
  };
  

export default DashboardPage;
