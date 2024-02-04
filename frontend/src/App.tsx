import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Style/root.css";
import SignUp from "./Components/Authentication/SignUp";
import RegistrationLandingPage from "./Pages/RegistrationLandingPage";
import LogInLandingPage from "./Pages/LogInLandingPage";
import UserProfileLandingPage from "./Pages/UserProfileLandingPage";
import EmployeeRegistrationLandingPage from "./Pages/EmployeeRegistrationLandingPage";
import Hero from "./Pages/Hero";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="Login" element={<LogInLandingPage />} />
        <Route path="Register" element={<RegistrationLandingPage />} />
        <Route path="Login" element={<LogInLandingPage />} />
        <Route path="Employee/Registration" element={<EmployeeRegistrationLandingPage />} />
        <Route path="Profile" element={<UserProfileLandingPage />} />
        <Route path="*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
