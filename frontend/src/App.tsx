import React from "react";
import { Routes, Route } from "react-router-dom";
import "./Style/root.css";
import RegistrationLandingPage from "./Pages/RegistrationLandingPage";
import LogInLandingPage from "./Pages/LogInLandingPage";
import UserProfileLandingPage from "./Pages/UserProfileLandingPage";
import EmployeeRegistrationLandingPage from "./Pages/EmployeeRegistrationLandingPage";
import Hero from "./Pages/Hero";
import NavBar from "./Components/NavBar";
import CondoProfileLandingPage from "./Pages/CondoProfileLandingPage";

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
        <Route path="CondoProfile" element={<CondoProfileLandingPage />} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
