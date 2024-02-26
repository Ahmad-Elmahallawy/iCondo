import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../Common/LoadingScreen";
import { resetPasswordInitialValues } from "../Common/InitialValues";
import { resetPasswordValidationSchema } from "../Common/ValidationSchema";

interface FormValues {
  username: string;
  password: string;
  password_confirm: string;
}

const ResetPassword: React.FC = () => {
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Using formik to validate user inputs
  const formik = useFormik<FormValues>({
    initialValues: resetPasswordInitialValues,
    validationSchema: resetPasswordValidationSchema,
    // setup onSubmit function, no functionality yet
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setResetPasswordError(null);
        navigate("/Login");
      } catch (error: any) {
        console.error("Password reset failed:", error.message);
        setResetPasswordError("Password reset failed: ");
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <div data-testid="reset-container" className="reset-password-container">
      <div className="reset-password-container">
        <div className="reset-password-content">
          <h2>Reset your password</h2>
          <form onSubmit={formik.handleSubmit} className="reset-password-form">
            <div>
              <div
                className={`input-with-icon ${
                  formik.touched.username && formik.errors.username
                    ? "input-border-error"
                    : ""
                }`}
              >
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

              <div
                className={`input-with-icon ${
                  formik.touched.password_confirm &&
                  formik.errors.password_confirm
                    ? "input-border-error"
                    : ""
                }`}
              >
                <img src="Assets/lock.svg" alt="" />
                <input
                  id="password_confirm"
                  name="password_confirm"
                  type="password"
                  placeholder="Confirm Password"
                  value={formik.values.password_confirm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.password_confirm &&
              formik.errors.password_confirm ? (
                <p className="error-msg">{formik.errors.password_confirm}</p>
              ) : (
                <p className="error-msg-alternative"></p>
              )}
            </div>
            {isLoading && <LoadingScreen />}

            {resetPasswordError && (
              <p className="error-msg">{resetPasswordError}</p>
            )}
            <button type="submit" className="reset-password-button">
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
