import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Style/root.css'
import SignUp from './Components/Authentication/SignUp';
import RegistrationLandingPage from './Pages/RegistrationLandingPage';
import LogInLandingPage from './Pages/LogInLandingPage';
import NavBar from './Components/NavBar';
import Hero from './Pages/Hero';


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
