import React from "react";
import { Routes, Route } from "react-router-dom";
import "./Style/root.css";
import RegistrationLandingPage from "./Pages/RegistrationLandingPage";
import LogInLandingPage from "./Pages/LogInLandingPage";
import UserProfileLandingPage from "./Pages/UserProfileLandingPage";
import EmployeeRegistrationLandingPage from "./Pages/EmployeeRegistrationLandingPage";
import Hero from "./Pages/Hero";
import NavBar from "./Components/NavBar";
import PropertiesListPage from "./Pages/PropertyListLandingPage";
import DashboardPage from "./Pages/CompanyDashboardLandingPage";
import CondoProfileLandingPage from "./Pages/CondoProfileLandingPage";
import CreatePropertyLandingPage from "./Pages/CreatePropertyLandingPage";
import PropertyProfileLandingPage from "./Pages/PropertyProfileLandingPage";
import CondoCreationLandingPage from "./Pages/CondoCreationLandingPage";
import EmployeeRequestsLandingPage from "./Pages/EmployeeRequestsLandingPage";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="Login" element={<LogInLandingPage />} />
        <Route path="Register" element={<RegistrationLandingPage />} />
        <Route path="Profile" element={<UserProfileLandingPage />} />
        <Route
          path="Employee/Registration"
          element={<EmployeeRegistrationLandingPage />}
        />
        <Route path="Profile" element={<UserProfileLandingPage />} />
        <Route path="CompanyDashboard" element={<DashboardPage />} />
        <Route
          path="GenerateKey"
          element={
            <EmployeeRequestsLandingPage />
          } 
        />
        <Route
          path="RegisterEmployee"
          element={<DashboardPage />} /*CHANGE PATH ONCE PAGE IS CREATED*/
        />
        <Route
          path="CreateProperty"
          element={<CreatePropertyLandingPage />}
        />
        <Route
          path="EmployeeList"
          element={<DashboardPage />} /*CHANGE PATH ONCE PAGE IS CREATED*/
        />
        <Route
          path="RegistrationKeyList"
          element={<DashboardPage />} /*CHANGE PATH ONCE PAGE IS CREATED*/
        />
        <Route path="PropertiesList" element={<PropertiesListPage />} />

        <Route path="CondoProfile" element={<CondoProfileLandingPage />} />
        <Route
          path="/PropertyProfile/:id"
          element={<PropertyProfileLandingPage />}
        />

        <Route path="CondoCreation" element={<CondoCreationLandingPage />} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
