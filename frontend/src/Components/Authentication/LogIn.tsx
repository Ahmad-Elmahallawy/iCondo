// SignUp.tsx
import React from "react";
import { useFormik } from "formik"; //hook
import * as Yup from "yup";
import "../../Style/AuthenticationStyle/SignUpStyle.css";

// Define the shape of form values
interface FormValues {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
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
    onSubmit: (values) => {
      // TODO: handle form submission later
      console.log(values);
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
        ) : null}

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
        ) : null}
      </div>
      {/* // TODO: add signup button here */}
      <button type="submit" className="registration-and-login-button">
        Log in
      </button>
    </form>
  );
};

export default SignUp;
