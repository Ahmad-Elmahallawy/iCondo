import * as Yup from "yup";

// schema for signup input fields
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

// schema for signup input fields
export const employeeRegistrationValidationSchema = Yup.object({
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
});

// schema for login input fields
export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Required"),
});

// schema for condo input fields
export const condoValidationSchema = Yup.object({
  unitNumber: Yup.string().required("Required"),
  netArea: Yup.string()
    .required("Required")
    .matches(/^[0-9]+$/, "Net Area must be a number"),

  condoFee: Yup.string()
    .required("Required")
    .matches(/^[0-9]+$/, "Condo Fee must be a number"),
});

export const resetPasswordValidationSchema = Yup.object({
  username: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Required"),
  password_confirm: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Required"),
});
export const createPropertyValidationSchema = Yup.object({
  propertyName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  unitCount: Yup.number()
    .typeError("Unit Count must be a number")
    .required("Required"),
  parkingCount: Yup.number()
    .typeError("Parking Count must be a number")
    .required("Required"),
  lockerCount: Yup.number()
    .typeError("Locker Count must be a number")
    .required("Required"),
});

export const createCommonFacilitySchema = Yup.object({
  propertyName: Yup.string()
    .required('Property name is required'),
  facility: Yup.string()
    .oneOf(['sauna', 'spa_fitness', 'sky_lounge'], 'Invalid status')
    .required('Facility name is required'),
  status: Yup.string()
    .oneOf(['Open', 'Closed'], 'Invalid status')
    .required('Status is required'),
});