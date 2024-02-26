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

        const registrationEndpoint = "http://localhost:8000/api/login"; // API endpoint for login

        // Send login request to server
        const response = await axios.post(registrationEndpoint, data);

        // Prepare user data to store in localStorage
        const userData = {
          ...response.data,
          password: values.password, // Assuming the server doesn't return passwords in response
        };

        // Store user data in localStorage
        localStorage.setItem("userData", JSON.stringify(userData));

        // Clear registration error and navigate to home page
        setRegistrationError(null);
        navigate("/");

        // TODO: Handle the token (e.g., store it in localStorage) and redirect the user
      } catch (error: any) {
        console.error("Login failed:", error.response.data.message);

        // Set registration error based on error response status
        if (error.response && error.response.status === 401) {
          setRegistrationError("Username or Password is not correct");
        } else {
          // Handle other error statuses here if needed
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
        }
      </p>
      <button type="submit" className="registration-and-login-button">
        Log in
      </button>
    </form>
  );
};

export default Login;
