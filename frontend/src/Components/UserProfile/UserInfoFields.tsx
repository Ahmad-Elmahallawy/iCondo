import React from "react";
import "../../Style/UserProfileStyle/UserInformationStyle.css";
import { UserData } from "./UserInformation";

interface UserInformationProps {
  data: UserData;
  editMode: Boolean;
  handleChange: (field: string, value: string) => void;
}


const UserInfoFields: React.FC<UserInformationProps> = ({
  data,
  editMode,
  handleChange,
}) => {
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  console.log(user);
  
  return (
    // Component to display userinformation: username, first, last, email, phone number and password.
    <div className="user-information-fields">
      <h2 className="user-information-heading">My Profile</h2>

      <div className="user-information-field">
        <label className="user-information-label" htmlFor="username">
          Username:
        </label>
        {/* If editMode is true, then user can edit these fields */}
        {editMode ? (
          <input
            id="username"
            className="user-information-input"
            type="text"
            value={data.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{data.username}</span>
        )}
      </div>

      <div className="user-information-field">
        <label className="user-information-label" htmlFor="firstName">
          First Name:
        </label>
        {editMode ? (
          <input
            id="firstName"
            className="user-information-input"
            type="text"
            value={data.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{data.firstName}</span>
        )}
      </div>

      <div className="user-information-field">
        <label className="user-information-label" htmlFor="lastName">
          Last Name:
        </label>
        {editMode ? (
          <input
            id="lastName"
            className="user-information-input"
            type="text"
            value={data.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{data.lastName}</span>
        )}
      </div>

      <div className="user-information-field">
        <label className="user-information-label" htmlFor="email">
          Email:
        </label>
        {editMode ? (
          <input
            id="email"
            className="user-information-input"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{data.email}</span>
        )}
      </div>

      <div className="user-information-field">
        <label className="user-information-label" htmlFor="phoneNumber">
          Phone Number:
        </label>
        {editMode ? (
          <input
            id="phoneNumber"
            className="user-information-input"
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{data.phoneNumber}</span>
        )}
      </div>

      <div className="user-information-field">
        <label className="user-information-label" htmlFor="password">
          Password:
        </label>
        {editMode ? (
          <input
            id="password"
            className="user-information-input"
            type="password"
            value={data.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{user.password}</span>
        )}
      </div>
    </div>
  );
};

export default UserInfoFields;
