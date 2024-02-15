import React from "react";
import { Routes, Route } from "react-router-dom";
import "./Style/root.css";
import RegistrationLandingPage from "./Pages/RegistrationLandingPage";
import LogInLandingPage from "./Pages/LogInLandingPage";
import UserProfileLandingPage from "./Pages/UserProfileLandingPage";
import EmployeeRegistrationLandingPage from "./Pages/EmployeeRegistrationLandingPage";
import Hero from "./Pages/Hero";
import NavBar from "./Components/NavBar";
import PropertiesListPage from "./Pages/PropertyListPage";
import DashboardPage from "./Pages/CompanyDashboardLandingPage";

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
          element={<DashboardPage />} /*CHANGE PATH ONCE PAGE IS CREATED*/
        />
        <Route
          path="RegisterEmployee"
          element={<DashboardPage />} /*CHANGE PATH ONCE PAGE IS CREATED*/
        />
        <Route
          path="CreateProperty"
          element={<DashboardPage />} /*CHANGE PATH ONCE PAGE IS CREATED*/
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
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
