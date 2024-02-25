// components/EmployeeRegistration.js

import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "../../Style/AuthenticationStyle/LoginAndRegistrationStyle.css";
import "../../Style/AuthenticationStyle/EmployeeRegistrationStyle.css";
import { signUpInitialValues } from "../Common/InitialValues";
import { signUpValidationSchema } from "../Common/ValidationSchema";
import LoadingScreen from "../Common/LoadingScreen";
const EmployeeRegistration = () => {
  const [selectedRole, setSelectedRole] = useState("Manager"); // Default value
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: { ...signUpInitialValues, role: selectedRole },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      values.role = selectedRole;
      try {
        const registrationUrl =
          "http://localhost:8000/api/users/register/employee";
        const response = await axios.post(registrationUrl, values);
        console.log("Employee registration successful:", response.data);
        setResultMessage("Employee Added Successfully");
      } catch (error: any) {
        console.error("Employee registration failed:", error.message);
        if (error.response && error.response.status === 400) {
          setResultMessage(
            "User with this email, username or phone number already exists OR Company does not Exist"
          );
        } else {
          // Handle other error statuses here if needed
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleRoleChange = (event: any) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="registration-and-login-content-main-div">
      <div className="form-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="registration-user-type">
            <label htmlFor="role">Employee's Role is </label>
            <select
              id="role"
              name="role"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value="Manager">Manager</option>
              <option value="Operator">Operator</option>
              <option value="FinanceManager">Finance Manager</option>
            </select>
          </div>
          <div
            className={`input-with-icon ${
              formik.touched.companyName && formik.errors.companyName
                ? "input-border-error"
                : ""
            }`}
          >
            <img src="Assets/company.svg" alt="" />
            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Company Name"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.companyName && formik.errors.companyName && (
              <p className="error-msg">{formik.errors.companyName}</p>
            )}
          </div>

          <div
            className={`input-with-icon ${
              formik.touched.firstName && formik.errors.firstName
                ? "input-border-error"
                : ""
            }`}
          >
            <img src="Assets/person.svg" alt="" />
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="error-msg">{formik.errors.firstName}</p>
            )}
          </div>
          <div
            className={`input-with-icon ${
              formik.touched.lastName && formik.errors.lastName
                ? "input-border-error"
                : ""
            }`}
          >
            <img src="Assets/person.svg" alt="" />
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="error-msg">{formik.errors.lastName}</p>
            )}
          </div>
          <div
            className={`input-with-icon ${
              formik.touched.username && formik.errors.username
                ? "input-border-error"
                : ""
            }`}
          >
            <img src="Assets/person.svg" alt="" />
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="error-msg">{formik.errors.username}</p>
            )}
          </div>
          <div
            className={`input-with-icon ${
              formik.touched.email && formik.errors.email
                ? "input-border-error"
                : ""
            }`}
          >
            <img src="Assets/letter.svg" alt="" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="error-msg">{formik.errors.email}</p>
            )}
          </div>
          <div
            className={`input-with-icon ${
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? "input-border-error"
                : ""
            }`}
          >
            <img src="Assets/phone.svg" alt="" />
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="error-msg">{formik.errors.phoneNumber}</p>
            )}
          </div>
          <div
            className={`input-with-icon ${
              formik.touched.password && formik.errors.password
                ? "input-border-error"
                : ""
            }`}
          >
            <img src="Assets/lock.svg" alt="" />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="error-msg">{formik.errors.password}</p>
            )}
          </div>
          {isLoading && <LoadingScreen />}
          {resultMessage === "Employee Added Successfully" ? (
            <p className="success-msg">{resultMessage}</p>
          ) : (
            <p className="error-msg">{resultMessage}</p>
          )}
          <button type="submit" className="registration-and-login-button">
            Register Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegistration;
