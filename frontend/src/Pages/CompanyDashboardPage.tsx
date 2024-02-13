import React from 'react';
import IconCard from '../Components/CompanyDashboard/IconCard';
import "../Style/CompanyDashboard/CompanyDashboardStyle.css";

const DashboardPage: React.FC = () => {
    const Register_employee = "/Assets/RegisterEmployee.png";
    const Generate_key = "/Assets/GenerateKey.png";
    const Create_property = "/Assets/CreateProperty.png";
    const Employee_list = "/Assets/EmployeeList.png";
    const Registration_key_list = "/Assets/RegistrationKeyList.png";
    const Properties_list = "/Assets/PropertiesList.png";

    return (
      <div className="dashboard-page">
        <div className="dashboard">
          <div className= "row">
            <h2 className="page-title">Dashboard</h2>
          </div>
          <div className="row">
            <IconCard title="Register Employee" icon= {Register_employee} route="/RegisterEmployee" />
            <IconCard title="Generate Key" icon={Generate_key} route="/GenerateKey" />
            <IconCard title="Create Property" icon={Create_property} route="/CreateProperty" />
          </div>
          <div className="row">
            <IconCard title="Employees List" icon={Employee_list} route="/EmployeeList" />
            <IconCard title="Registration Key List" icon={Registration_key_list} route="/RegistrationKeyList" />
            <IconCard title="Properties List" icon={Properties_list} route="/PropertiesList" />
          </div>
        </div>
      </div>
    );
  };
  

export default DashboardPage;
