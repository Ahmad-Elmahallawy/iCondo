import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Style/root.css'
import SignUp from './Components/Authentication/SignUp';
import RegistrationLandingPage from './Components/Authentication/RegistrationLandingPage';
import LogInLandingPage from './Components/Authentication/LogInLandingPage';
import UserProfilePage from './Components/UserProfilePage';


function App() {



  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="Login" element={<LogInLandingPage />} />
        <Route path="Register" element={<RegistrationLandingPage />} />
        <Route path="Signup" element={<SignUp />} />
        <Route path="Portfolio" element={<></>} />
        <Route path="Finance" element={<></>} />
        <Route path="*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
