import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  first_name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  last_name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  username: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid Email Address").required("Required"),
  phone_number: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Invalid Phone Number")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Required"),
  company_name: Yup.string().matches(/.*/, {
    excludeEmptyString: true,
    message: "Company Name is required",
  }),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid Email Address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Required"),
});