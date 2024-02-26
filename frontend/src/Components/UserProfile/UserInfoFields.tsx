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
        <label className="user-information-label" htmlFor="first_name">
          First Name:
        </label>
        {editMode ? (
          <input
            id="first_name"
            className="user-information-input"
            type="text"
            value={data.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{data.first_name}</span>
        )}
      </div>

      <div className="user-information-field">
        <label className="user-information-label" htmlFor="last_name">
          Last Name:
        </label>
        {editMode ? (
          <input
            id="last_name"
            className="user-information-input"
            type="text"
            value={data.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{data.last_name}</span>
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
        <label className="user-information-label" htmlFor="phone_number">
          Phone Number:
        </label>
        {editMode ? (
          <input
            id="phone_number"
            className="user-information-input"
            type="tel"
            value={data.phone_number}
            onChange={(e) => handleChange("phone_number", e.target.value)}
          />
        ) : (
          <span className="user-information-text">{data.phone_number}</span>
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
          <span className="user-information-text">{data.password}</span>
        )}
      </div>
    </div>
  );
};

export default UserInfoFields;
