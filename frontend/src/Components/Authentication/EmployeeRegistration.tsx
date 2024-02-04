// components/EmployeeRegistration.js

import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import "../../Style/AuthenticationStyle/LoginAndRegistrationStyle.css";
import "../../Style/AuthenticationStyle/EmployeeRegistrationStyle.css";
import { signUpInitialValues } from "../Common/InitialValues";
import { signUpValidationSchema } from "../Common/ValidationSchema";

const EmployeeRegistration = () => {
  const formik = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      try {
        const registrationUrl = "http://localhost:8000/api/employee/register";
        const response = await axios.post(registrationUrl, values);
        console.log("Employee registration successful:", response.data);
      } catch (error: any) {
        console.error("Employee registration failed:", error.message);
      }
    },
  });

  return (
    <div className="registration-and-login-content-main-div">
      <div className="form-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="registration-user-type">
            <label htmlFor="user_type">Employee's Role is </label>
            <select id="user_type" name="user_type">
              <option value="Manager">Manager</option>
              <option value="Operator">Operator</option>
              <option value="FinanceManager">FinanceManager</option>
            </select>
          </div>
          .
          <div
            className={`input-with-icon ${
              formik.touched.first_name && formik.errors.first_name
                ? "input-border-error"
                : ""
            }`}
          >
            <img src="Assets/person.svg" alt="" />
            <input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First Name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <p className="error-msg">{formik.errors.first_name}</p>
            )}
          </div>
          <div
            className={`input-with-icon ${
              formik.touched.last_name && formik.errors.last_name
                ? "input-border-error"
                : ""
            }`}
          >
            <img src="Assets/person.svg" alt="" />
            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <p className="error-msg">{formik.errors.last_name}</p>
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
              formik.touched.phone_number && formik.errors.phone_number
                ? "input-border-error"
                : ""
            }`}
          >
            <img src="Assets/phone.svg" alt="" />
            <input
              id="phone_number"
              name="phone_number"
              type="text"
              placeholder="Phone Number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone_number && formik.errors.phone_number && (
              <p className="error-msg">{formik.errors.phone_number}</p>
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
          <button type="submit" className="registration-and-login-button">
            Register Employee
          </button>
        </form>
      </div>

      {/* Employee Table (Placeholder) */}
      <div className="employee-table">
        <h2>Employee Table</h2>
        {/* Add your table component or code here */}
      </div>
    </div>
  );
};

export default EmployeeRegistration;
