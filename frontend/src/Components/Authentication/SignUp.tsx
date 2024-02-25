import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../Style/AuthenticationStyle/LoginAndRegistrationStyle.css";
import "../../Style/AuthenticationStyle/SignUpStyle.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../Common/LoadingScreen";
import { signUpInitialValues } from "../Common/InitialValues";
import { signUpValidationSchema } from "../Common/ValidationSchema";

interface FormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone_number: string;
  password: string;
  company_name: string;
  role?: string;
}

const SignUp: React.FC = () => {
  const [userType, setUserType] = useState("PublicUser");
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: signUpInitialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        // Common data for both user types
        const commonUserData = {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          phone_number: values.phone_number,
          password: values.password,
        } as {
          firstName: string;
          lastName: string;
          username: string;
          email: string;
          phone_number: string;
          password: string;
          role?: string;
          company_name?: string;
        };

        userType === "PublicUser"
          ? (commonUserData.role = "PublicUser")
          : (commonUserData.company_name = values.company_name);
        console.log(commonUserData);

        const registrationEndpoint =
          userType === "PublicUser"
            ? "http://localhost:8000/api/users"
            : "http://localhost:8000/api/users/adminCompanyCreation";

        const response = await axios.post(registrationEndpoint, commonUserData);

        console.log("Registration successful:", response.data);

        setRegistrationError(null);
        navigate("/Login");
      } catch (error: any) {
        console.error("Registration failed:", error.message);
        setRegistrationError("Registration failed: ");
        if (error.response && error.response.status === 400) {
          if (userType === "PublicUser") {
            setRegistrationError(
              "User with this email, username, or phone number already exists"
            );
          } else if (userType === "Admin") {
            setRegistrationError(
              "Admin with this email, username, or phone number already exists"
            );
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="registration-and-login-form"
    >
      <div>
        <div className="registration-user-type">
          <label htmlFor="userType">I am a </label>
          <select
            id="userType"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setUserType(e.target.value);
            }}
          >
            <option value="PublicUser">Public User</option>
            <option value="Company">Company</option>
          </select>
        </div>
        {userType === "Company" && (
          <>
            <div
              className={`input-with-icon ${
                formik.touched.company_name && formik.errors.company_name
                  ? "input-border-error"
                  : ""
              }`}
            >
              <img src="Assets/company.svg" alt="" />
              <input
                id="company_name"
                name="company_name"
                type="text"
                placeholder="Company Name"
                value={formik.values.company_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.company_name && formik.errors.company_name ? (
              <p className="error-msg">{formik.errors.company_name}</p>
            ) : (
              <p className="error-msg-alternative"></p>
            )}
          </>
        )}
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
        </div>
        {formik.touched.firstName && formik.errors.firstName ? (
          <p className="error-msg">{formik.errors.firstName}</p>
        ) : (
          <p className="error-msg-alternative"></p>
        )}

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
        </div>
        {formik.touched.lastName && formik.errors.lastName ? (
          <p className="error-msg">{formik.errors.lastName}</p>
        ) : (
          <p className="error-msg-alternative"></p>
        )}
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
        </div>
        {formik.touched.username && formik.errors.username ? (
          <p className="error-msg">{formik.errors.username}</p>
        ) : (
          <p className="error-msg-alternative"></p>
        )}
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
        </div>
        {formik.touched.email && formik.errors.email ? (
          <p className="error-msg">{formik.errors.email}</p>
        ) : (
          <p className="error-msg-alternative"></p>
        )}

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
        </div>
        {formik.touched.phone_number && formik.errors.phone_number ? (
          <p className="error-msg">{formik.errors.phone_number}</p>
        ) : (
          <p className="error-msg-alternative"></p>
        )}

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
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p className="error-msg">{formik.errors.password}</p>
        ) : (
          <p className="error-msg-alternative"></p>
        )}
      </div>
      {isLoading && <LoadingScreen />}
      {registrationError && <p className="error-msg">{registrationError}</p>}
      <p className="registration-and-login-to-eachother">
        Already have an account?{" "}
        {
          <Link to="/Login">
            <span>Log in here</span>
          </Link>
        }
      </p>
      <button type="submit" className="registration-and-login-button">
        Register
      </button>
    </form>
  );
};

export default SignUp;
