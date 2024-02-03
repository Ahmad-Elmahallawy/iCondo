import React, { useState } from "react";
import { useFormik } from "formik"; //hook
import * as Yup from "yup";
import "../../Style/AuthenticationStyle/LoginAndRegistrationStyle.css";
import "../../Style/AuthenticationStyle/SignUpStyle.css";

// Define the shape of form values
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  companyName: string;
}

const SignUp: React.FC = () => {
  const [userType, setUserType] = useState("regularUser");

  // Initialize useFormik with initial values and validation logic
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      companyName: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid Email Address").required("Required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10,15}$/, "Invalid Phone Number")
        .required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Required"),
      companyName: Yup.string()
        .max(20, "Must be 20 characters or less")
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
      <div className="registration-and-login-content-main-div">
        <div className="registration-user-type">
          <label htmlFor="userType">I am a </label>
          <select
            id="userType"
            onChange={(e) => {
              setUserType(e.target.value);
            }}
          >
            <option value="regularUser">Regular User</option>
            <option value="company">Company</option>
          </select>
        </div>
        {userType === "regularUser" ? (
          <>
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
            ) : <p className="error-msg-alternative"></p>}

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
            ) : <p className="error-msg-alternative"></p>}
          </>
        ) : (
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
                type="companyName"
                placeholder="Company Name"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.companyName && formik.errors.companyName ? (
              <p className="error-msg">{formik.errors.companyName}</p>
            ) : <p className="error-msg-alternative"></p>}
          </>
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
        ) : <p className="error-msg-alternative"></p>}

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
        ) : <p className="error-msg-alternative"></p>}

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
        ) : <p className="error-msg-alternative"></p>}
      </div>
      <button type="submit" className="registration-and-login-button">
        Register
      </button>
    </form>
  );
};

export default SignUp;
