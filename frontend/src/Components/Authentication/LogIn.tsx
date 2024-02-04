// SignUp.tsx
import React, { useState } from "react";
import { useFormik } from "formik"; //hook
import * as Yup from "yup";
import "../../Style/AuthenticationStyle/LoginAndRegistrationStyle.css";
import axios from "axios";
import LoadingScreen from "../Common/LoadingScreen";
import { Link, useNavigate } from "react-router-dom";

// Define the shape of form values
interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Initialize useFormik with initial values and validation logic
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email Address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/users/login",
          {
            params: {
              email: values.email,
              password: values.password,
            },
          }
        );
        setRegistrationError(null);
        navigate("/");
        // TODO: Handle the token (e.g., store it in localStorage) and redirect the user
      } catch (error: any) {
        // Handle errors, e.g., display an error message to the user
        console.error("Login failed:", error.response.data.message);
        if (error.response && error.response.status === 401) {
          setRegistrationError("Email or Password is not correct");
        } else {
          // Handle other error statuses here if needed
        }
      } finally {
        setIsLoading(false); // Set loading state to false after the request is completed
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="registration-and-login-form"
    >
      <div>
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
