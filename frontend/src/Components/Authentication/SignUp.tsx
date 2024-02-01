import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../Style/AuthenticationStyle/LoginAndRegistrationStyle.css";
import "../../Style/AuthenticationStyle/SignUpStyle.css";
import axios from "axios";
import { Link } from "react-router-dom";

interface FormValues {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  password: string;
  companyName: string;
}

const SignUp: React.FC = () => {
  const [userType, setUserType] = useState("regularUser");
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const clearRegistrationError = () => {
    setRegistrationError(null);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      companyName: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
      last_name: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
      username: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
      email: Yup.string().email("Invalid Email Address").required("Required"),
      phone_number: Yup.string().matches(/^[0-9]{10,15}$/, "Invalid Phone Number").required("Required"),
      password: Yup.string().min(8, "Password must be at least 8 characters long").required("Required"),
      companyName: Yup.string().matches(/.*/, {
        excludeEmptyString: userType === "regularUser",
        message: "Company Name is required",
      }),
    }),
    onSubmit: async (values) => {
      try {
        const registrationUrl = "http://localhost:8000/api/users/";

        const { first_name, last_name, username, phone_number, email, password } = values;

        const userData = {
          first_name,
          last_name,
          username,
          phone_number,
          email,
          password,
          role: "user",
        };

        const response = await axios.post(registrationUrl, userData);

        console.log("Registration successful:", response.data);

        clearRegistrationError();
      } catch (error: any) {
        console.error("Registration failed:", error.message);

        if (error.response && error.response.status === 400) {
          setRegistrationError("User with this email or username already exists");
        } else {
          // Handle other error statuses here if needed
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="registration-and-login-form">
      <div>
        <div className="registration-user-type">
          <label htmlFor="userType">I am a </label>
          <select
            id="userType"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setUserType(e.target.value);
            }}
          >
            <option value="regularUser">Regular User</option>
            <option value="company">Company</option>
          </select>
        </div>
        {userType === "regularUser" ? (
          <>
            <div className={`input-with-icon ${formik.touched.first_name && formik.errors.first_name ? "input-border-error" : ""}`}>
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
            {formik.touched.first_name && formik.errors.first_name && <p className="error-msg">{formik.errors.first_name}</p>}

            <div className={`input-with-icon ${formik.touched.last_name && formik.errors.last_name ? "input-border-error" : ""}`}>
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
            {formik.touched.last_name && formik.errors.last_name && <p className="error-msg">{formik.errors.last_name}</p>}
          </>
        ) : (
          <>
            <div className={`input-with-icon ${formik.touched.companyName && formik.errors.companyName ? "input-border-error" : ""}`}>
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
            {formik.touched.companyName && formik.errors.companyName && <p className="error-msg">{formik.errors.companyName}</p>}
          </>
        )}
        <div className={`input-with-icon ${formik.touched.username && formik.errors.username ? "input-border-error" : ""}`}>
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
        {formik.touched.username && formik.errors.username && <p className="error-msg">{formik.errors.username}</p>}
        <div className={`input-with-icon ${formik.touched.email && formik.errors.email ? "input-border-error" : ""}`}>
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
        {formik.touched.email && formik.errors.email && <p className="error-msg">{formik.errors.email}</p>}

        <div className={`input-with-icon ${formik.touched.phone_number && formik.errors.phone_number ? "input-border-error" : ""}`}>
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
        {formik.touched.phone_number && formik.errors.phone_number && <p className="error-msg">{formik.errors.phone_number}</p>}

        <div className={`input-with-icon ${formik.touched.password && formik.errors.password ? "input-border-error" : ""}`}>
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
        {formik.touched.password && formik.errors.password && <p className="error-msg">{formik.errors.password}</p>}
      </div>

      {registrationError && <p className="error-msg">{registrationError}</p>}
      <p>Already Have an account? {<Link to="/Login"><span>Log in here</span></Link>}</p>
      <button type="submit" className="registration-and-login-button">
        Register
      </button>
    </form>
  );
};

export default SignUp;
