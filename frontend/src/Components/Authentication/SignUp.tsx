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
  phoneNumber: string;
  password: string;
  companyName: string;
  roles: string[];
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
          phoneNumber: values.phoneNumber,
          password: values.password,
        } as {
          firstName: string;
          lastName: string;
          username: string;
          email: string;
          phoneNumber: string;
          password: string;
          roles: string[];
          companyName: string;
        };

        userType === "PublicUser" && (commonUserData.roles = ["PublicUser"]);

        console.log(commonUserData);

        const registrationEndpoint = "http://localhost:8000/api/users";
        if (userType === "Company") {
          commonUserData.roles = ["Admin"];
          commonUserData.companyName = values.companyName;
        }

        if (userType === "Company") {
          const response = await axios.post(registrationEndpoint, {
            firstName: commonUserData.firstName,
            lastName: commonUserData.lastName,
            username: commonUserData.username,
            email: commonUserData.email,
            phoneNumber: commonUserData.phoneNumber,
            password: commonUserData.password,
            roles: commonUserData.roles,
          });
          commonUserData.roles = ["Admin"];
          commonUserData.companyName = values.companyName;
          const response1 = await axios.post(
            "http://localhost:8000/api/companies",
            {
              name: commonUserData.companyName,
            }
          );
          console.log(response);
          console.log(response1);

          const response2 = await axios.post(
            "http://localhost:8000/api/companyEmployees",
            {
              "company": {
                "id": response.data.id,
              },
              "user": {
                "id": response.data.id,
              },
            }
          );
        } else {
          const response = await axios.post(
            registrationEndpoint,
            commonUserData
          );
        }

        setRegistrationError(null);
        navigate("/Login");
      } catch (error: any) {
        console.error("Registration failed:", error.message);
        setRegistrationError(`Registration failed: ${error.message}`);
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
            </div>
            {formik.touched.companyName && formik.errors.companyName ? (
              <p className="error-msg">{formik.errors.companyName}</p>
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
        </div>
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <p className="error-msg">{formik.errors.phoneNumber}</p>
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
