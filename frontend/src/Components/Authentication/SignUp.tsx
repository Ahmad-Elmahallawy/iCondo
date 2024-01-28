// SignUp.tsx
import React from "react";
import { useFormik } from "formik"; //hook
import * as Yup from "yup";

// Define the shape of form values
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const SignUp: React.FC = () => {
  // Initialize useFormik with initial values and validation logic
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
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
      phoneNumber: Yup.string().matches(
        /^[0-9]{10,15}$/,
        "Invalid Phone Number"
      ),
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
    <form action="" onSubmit={formik.handleSubmit}>
      <div>
        <div className="input-with-icon">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="25" height="25" fill="url(#pattern0)" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlinkHref="#image0_32_143" transform="scale(0.0111111)" />
              </pattern>
              <image
                id="image0_32_143"
                width="90"
                height="90"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADFklEQVR4nO3cSWtUQRDA8YqJYDy6XUQ0xpsnDRFBiCAaFPHqvhwD+gn0pCcFES8mRPHm8g3Uo0LUiFswoolxwatx3AiKGuNfmldHE53MvO6e7vrBg5AJr6eKNz2d6npPxBhjjDHGGGNM9YBVwBHgKvAY+AD81KOiv3OvHQbaZzFEvoAWYB9wl+rdAfYCzaHjiBqwFRijdqNAd+h4ogPMBy5SfxeA1tDxRQFYAjyiPA+AxZIziiS7j3nZRrNNNsV0UeaV/Lcre57khnLm5H/pl5wA3YSzTTJaJ48FTPRIFutsYD/h7ZbUAYOhswzclgxqFzH4DbRJqigKRLHokVRRVNpicVlSBQwRj4eSKooacizGJVXAD+LxXVJFZCRVREZSRWQkVdgc7S3RFeKR9KpjiHgkvY6+QjwuSaooGl1ikXSto10rZ6G597BCUsbsOpDqbUBSR9GyFdpOSR3Q7KmXYzrPstgzdIAtARO9SXJC0RfnW5/kBmjV7iFf7mXZqeS4fjhP87Xr5VgkOaNI9v2Sr+Q8GxynmUb6S0hyX7bTxUyAzfoxr8cSLq/VxSzX2XtcN1GV/667vx0AdgFzQsfRUIA2V/xxPRjaS13RDV53vHelTn2tJ/nahTHGGGOMMcYYUxtgGbC6rDy6c7sxJEfAOuAUMKwFIfdEmaP1LAa5cwHH9NzOE+Ak0Ckpo2ieOQG8nKECdxPoqMNYHcCtGcZxd+4eB1ZKCvSq2gHcAKaqKHleB7qqucJ1rI061v9y7+kasL0hS6t6v/ch4AW1eadl0APAGrfvB8zVw/28FjiozZPjNY41oudqkdgBTfrgqTc0rte68dAkMQLW60ZoKgaj+uJ0m5+6gvhFeqaA8+5pOTGsJJ6SvuFgDzDUb/iY7kkpm4u1y3eSO4EJ8vMV2OAryQvrsJRqZC72BT4SfSZ0pBE47SPRIR88FYvnPhL9LXSUEZjwkei3oaOMwCsfiT4XOsoInPWR6KXAR/L12dtGgt7s84X8fPLeDqydnr26CpkkXZMao5syl3tNsjHGGGOMMcYYY4zE6Q/APnnSzNZ12wAAAABJRU5ErkJggg=="
              />
            </defs>
          </svg>

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
          <p>{formik.errors.firstName}</p>
        ) : null}

        <div className="input-with-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-15h2v6h-2zm0 8h2v2h-2z" />
          </svg>
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
          <p>{formik.errors.lastName}</p>
        ) : null}

        <div className="input-with-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-15h2v6h-2zm0 8h2v2h-2z" />
          </svg>
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
          <p>{formik.errors.email}</p>
        ) : null}

        <div className="input-with-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-15h2v6h-2zm0 8h2v2h-2z" />
          </svg>
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
          <p>{formik.errors.phoneNumber}</p>
        ) : null}

        <div className="input-with-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-15h2v6h-2zm0 8h2v2h-2z" />
          </svg>
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
          <p>{formik.errors.password}</p>
        ) : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
