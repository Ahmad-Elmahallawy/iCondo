import React, { useState } from "react";
import { useFormik } from "formik"; // Form handling hook
import "../../Style/AuthenticationStyle/LoginAndRegistrationStyle.css"; // Stylesheet
import axios from "axios"; // HTTP client
import LoadingScreen from "../Common/LoadingScreen"; // Loading screen component
import { Link, useNavigate } from "react-router-dom"; // Router-related components
import { loginInitialValues } from "../Common/InitialValues"; // Initial form values
import { loginValidationSchema } from "../Common/ValidationSchema"; // Form validation schema

// Define interface for form values
interface FormValues {
  username: string;
  password: string;
}

// Define Login component
const Login: React.FC = () => {
  // State variables
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  ); // Registration error message
  const [isLoading, setIsLoading] = useState(false); // Loading indicator
  const navigate = useNavigate(); // Navigation function from React Router

  // Formik hook for handling form state, validation, and submission
  const formik = useFormik<FormValues>({
    initialValues: loginInitialValues, // Set initial form values
    validationSchema: loginValidationSchema, // Apply validation schema
    onSubmit: async (values) => {
      try {
        setIsLoading(true); // Set loading indicator on form submission

        // Prepare data for login
        const data = {
          username: values.username,
          password: values.password,
        };

        const loginEndpoint = "http://localhost:8000/api/login"; // API endpoint for login

        // Send login request to server
        const response = await axios.post(loginEndpoint, data);

        const userData = {
          ...response.data,
          password: values.password,
        };

        // Store user data in localStorage
        localStorage.setItem("userData", JSON.stringify(userData));

        // Redirect based on user's role
        const user = JSON.parse(localStorage.getItem("userData") || "{}");
        const isAdmin = user.roles && user.roles.includes("Admin");

        if (isAdmin) {
          const userIdEndpoint = `http://localhost:8000/api/users/${userData.id}/companyEmployees`;

          const companyID = await axios.get(userIdEndpoint, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          });
          localStorage.setItem(
            "companyDetails",
            JSON.stringify(companyID.data)
          );
          navigate("/CompanyDashboard");
        } else {
          navigate("/");
        }

        // Clear registration error
        setRegistrationError(null);
      } catch (error: any) {
        console.error("Login failed:", error); // Log the entire error object
        if (error.response && error.response.status === 401) {
          setRegistrationError("Username or Password is not correct");
        } else {
          setRegistrationError(
            "An unexpected error occurred. Please try again later."
          );
        }
      } finally {
        setIsLoading(false); // Set loading indicator to false after submission
      }
    },
  });

  // Render login form
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="registration-and-login-form"
    >
      <div>
        <div
          className={`input-with-icon ${
            formik.touched.username && formik.errors.username
              ? "input-border-error"
              : ""
          }`}
        >
          <img src="Assets/letter.svg" alt="" />
          <input
            id="username"
            name="username"
            type="username"
            placeholder="username"
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
        Don't have an account?{" "}
        {
          <Link to="/Register">
            <span>Sign Up here</span>
          </Link>
        }{" "}
        {
          <Link to="/ResetPassword">
            <span>Forgot Password?</span>
          </Link>
        }
      </p>
      <button type="submit" className="registration-and-login-button">
        Log in
      </button>
    </form>
  );
};

export default Login;
