import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  username: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid Email Address").required("Required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Invalid Phone Number")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Required"),
  companyName: Yup.string().matches(/.*/, {
    excludeEmptyString: true,
    message: "Company Name is required",
  }),
});

export const loginValidationSchema = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Required"),
});

export const condoValidationSchema = Yup.object({
  unitNumber: Yup.string().required("Required"),
  netArea: Yup.string()
    .required("Required")
    .matches(/^[0-9]+$/, "Net Area must be a number"),

  condoFee: Yup.string()
    .required("Required")
    .matches(/^[0-9]+$/, "Condo Fee must be a number"),
});
