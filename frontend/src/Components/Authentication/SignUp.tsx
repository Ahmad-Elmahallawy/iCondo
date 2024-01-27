import React from "react";
import { useFormik } from "formik"; //hook
import * as Yup from "yup";

// Define the shape of form values
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  // Initialize useFormik with initial values and validation logic
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
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
  console.log(formik.values);

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <div>
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <p>{formik.errors.firstName}</p>
        ) : null}
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <p>{formik.errors.lastName}</p>
        ) : null}
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <p>{formik.errors.email}</p>
        ) : null}
        <input
          id="password"
          name="password"
          type="text"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <p>{formik.errors.password}</p>
        ) : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
