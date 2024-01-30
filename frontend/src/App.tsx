import React from "react";
import "./Style/root.css";
import SignUp from "./Components/Authentication/SignUp";
import RegistrationLandingPage from "./Components/Authentication/RegistrationLandingPage";
import LogInLandingPage from "./Components/Authentication/LogInLandingPage";

function App() {
  return (
    <div className="App">
      <RegistrationLandingPage />
    </div>
  );
}

export default App;
