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
import KeyGenerationLandingPage from "./Pages/KeyGenerationLandingPage";
import ResetPassword from "./Components/Authentication/ResetPassword";
import NotificationPageManager from "./Pages/NotificationPageManager";
import CondoOwnerRequestsLandingPage from "./Pages/CondoOwnerRequestsLandingPage";
import EmployeeRequestsLandingPage from "./Pages/EmployeeRequestsLandingPage";
import CondoOwnerDashboardPage from "./Pages/CondoOwnerDashboardLandingPage";
import NotificationUser from "./Pages/NotificationLandingPageUser";
import EmployeeListLandingPage from "./Pages/EmployeeListLandingPage";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route 
          path="/" 
          element={<Hero />} 
        />
        <Route 
          path="Login" 
          element={<LogInLandingPage />} 
        />
        <Route 
          path="Register" 
          element={<RegistrationLandingPage />} 
        />
        <Route 
          path="ResetPassword" 
          element={<ResetPassword />} 
        />
        <Route 
          path="Profile" 
          element={<UserProfileLandingPage />} 
        />
        <Route
          path="Employee/Registration"
          element={<EmployeeRegistrationLandingPage />}
        />
        <Route 
          path="Profile" 
          element={<UserProfileLandingPage />} 
        />
        <Route 
          path="CompanyDashboard" 
          element={<DashboardPage />} 
        />
        <Route 
          path="CondoOwnerDashboard" 
          element={<CondoOwnerDashboardPage />} 
        />
        <Route 
          path="GenerateKey" 
          element={<EmployeeRequestsLandingPage />} 
        />
        <Route
          path="OwnerRequests"
          element={<CondoOwnerRequestsLandingPage />}
        />
        <Route
          path="EmployeeRequests"
          element={<EmployeeRequestsLandingPage />}
        />

        <Route
          path="RegisterEmployee"
          element={
            <EmployeeRegistrationLandingPage />
          }
        />
        <Route 
          path="CreateProperty" 
          element={<CreatePropertyLandingPage />} 
        />
        <Route
          path="EmployeeList"
          element={<EmployeeListLandingPage />}
        />
        <Route
          path="RegistrationKeyList"
          element={<DashboardPage />} /*CHANGE PATH ONCE PAGE IS CREATED*/
        />
        <Route 
          path="PropertiesList" 
          element={<PropertiesListPage />} 
        />
        <Route 
          path="CondoProfile" 
          element={<CondoProfileLandingPage />} 
        />
        <Route
          path="/PropertyProfile/:id"
          element={<PropertyProfileLandingPage />}
        />
        <Route 
          path="CondoCreation" 
          element={<CondoCreationLandingPage />} 
        />
        <Route
          path="Notifications/Company"
          element={<NotificationPageManager />}
        />
        
        <Route
          path="Notifications/User"
          element={<NotificationUser />}
        />
      </Routes>
    </div>
  );
}

export default App;
