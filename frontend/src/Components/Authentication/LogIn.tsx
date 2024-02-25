// SignUp.tsx
import React, { useState } from "react";
import { useFormik } from "formik"; //hook
import * as Yup from "yup";
import "../../Style/AuthenticationStyle/LoginAndRegistrationStyle.css";
import axios from "axios";
import LoadingScreen from "../Common/LoadingScreen";
import { Link, useNavigate } from "react-router-dom";
import { loginInitialValues } from "../Common/InitialValues";
import { loginValidationSchema } from "../Common/ValidationSchema";

interface FormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const data = {
          username: values.username,
          password: values.password,
        };
        const registrationEndpoint = "http://localhost:8000/api/login";
        console.log(data);

        const response = await axios.post(registrationEndpoint, data);
        const userData = {
          ...response.data,
          password: values.password,
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        setRegistrationError(null);
        navigate("/");
        // TODO: Handle the token (e.g., store it in localStorage) and redirect the user
      } catch (error: any) {
        console.error("Login failed:", error.response.data.message);
        if (error.response && error.response.status === 401) {
          setRegistrationError("username or Password is not correct");
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
