import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Style/Navbar/NavBarStyle.css";
import { isAuthenticated } from "../Components/Common/AuthUtil";
import LogOutModal from "./Authentication/LogOut";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleClick = () => setClick(!click);
  const userIsAuthenticated = isAuthenticated();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const isAdmin = user.roles && user.roles.includes("Admin");
  const isCondoOwner = user.roles && user.roles.includes("condoOwner");
  const isPublicUser = user.roles && user.roles.includes("PublicUser");
  const isEmployee = user.roles && (user.roles.includes("manager") || user.roles.includes("operator") || user.roles.includes("financialManager"));

  const handleLogout = () => {
    // Show the logout confirmation modal
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    // Hide the logout confirmation modal
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    // Perform the logout action
    localStorage.removeItem("userData");
    setShowLogoutModal(false);
    navigate("/Login");
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img
          width="130"
          height="130"
          src={"Assets/logo-placeholder.svg"}
          alt="logo"
        />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        {user && user.roles && user.roles.length > 0 && (
          <li className="nav-item">
            {user.roles[0] === "manager" || user.roles[0] === "operator" ? (
              <Link to="/Notifications/Company">
                <img src="Assets/bell.svg" alt="" />
              </Link>
            ) : (
              <Link to="/Notifications/User">
                <img src="Assets/bell.svg" alt="" />
              </Link>
            )}
          </li>
        )}
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>

        {userIsAuthenticated ? (
          <>
            <li className="nav-item" onClick={handleLogout}>
              <span>Log Out</span>
            </li>
            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link to="/CompanyDashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Employee/Registration">Register Employees</Link>
                </li>
              </>
            )}

            {(isEmployee) && (
              <>
                <li className="nav-item">
                  <Link to="/EmployeeRequests">Assigned Requests</Link>
                </li>
              </>
            )}

            {(isCondoOwner || isPublicUser) && (
              <>
                <li className="nav-item">
                  <Link to="/CondoOwnerDashboard">Dashboard</Link>
                </li>
              </>
            )}
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/Login">Log In</Link>
            </li>
            <li className="nav-item">
              <Link to="/Register">Register</Link>
            </li>
          </>
        )}

        <li className="nav-item">
          <Link to="/Profile">My Profile</Link>
        </li>
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {click ? (
          <FaTimes size={30} style={{ color: "#f8f8f8" }} />
        ) : (
          <FaBars size={30} style={{ color: "#f8f8f8" }} />
        )}
      </div>
      {showLogoutModal && (
        <LogOutModal
          onCancel={handleCancelLogout}
          onConfirm={handleConfirmLogout}
        />
      )}
    </div>
  );
};

export default Navbar;
