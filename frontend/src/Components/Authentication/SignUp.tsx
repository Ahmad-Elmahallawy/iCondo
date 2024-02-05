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
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  password: string;
  company_name: string;
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
        const registrationUrl = "http://localhost:8000/api/users/";

        const userData = {
          ...values,
          role: "PublicUser",
        };

        const response = await axios.post(registrationUrl, userData);
        console.log("Registration successful:", response.data);

        setRegistrationError(null);
        navigate("/Login");
      } catch (error: any) {
        console.error("Registration failed:", error.message);

        if (error.response && error.response.status === 400) {
          setRegistrationError(
            "User with this email, username or phone number already exists"
          );
        } else {
          // Handle other error statuses here if needed
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
      <div className="registration-and-login-content-main-div">
        <div className="registration-user-type">
          <label htmlFor="userType">I am a </label>
          <select
            id="userType"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setUserType(e.target.value);
            }}
          >
            <option value="PublicUser">Public User</option>
            <option value="company">Company</option>
          </select>
        </div>
        {userType === "PublicUser" ? (
          <>
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
            </div>
            {formik.touched.first_name && formik.errors.first_name ? (
              <p className="error-msg">{formik.errors.first_name}</p>
            ) : (
              <p className="error-msg-alternative"></p>
            )}

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
            </div>
            {formik.touched.last_name && formik.errors.last_name ? (
              <p className="error-msg">{formik.errors.last_name}</p>
            ) : (
              <p className="error-msg-alternative"></p>
            )}
          </>
        ) : (
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
