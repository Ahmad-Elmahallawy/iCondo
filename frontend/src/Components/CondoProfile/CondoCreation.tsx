// CondoCreation.js
import React from "react";
import { useFormik } from "formik";
import { condoInitialValues } from "../Common/InitialValues";
import { condoValidationSchema } from "../Common/ValidationSchema";
import "../../Style/CondoProfileStyle/CondoCreationStyle.css";

const CondoCreation = () => {
  const formik = useFormik({
    initialValues: condoInitialValues,
    validationSchema: condoValidationSchema,
    onSubmit: (values) => {
      console.log(values); // Handle form submission
    },
  });

  return (
    <div className="condo-creation-form-container">
      <div className="condo-creation-property-name-and-company-name">
        <h1>Property Name Here</h1>
        <h2>Company Name Here</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="condo-creation-wrapper">
          <input
            type="text"
            name="unitNumber"
            value={formik.values.unitNumber}
            onChange={formik.handleChange}
            placeholder="Condo Unit ID"
          />
          {formik.touched.unitNumber && formik.errors.unitNumber ? (
            <p className="error-msg">{formik.errors.unitNumber}</p>
          ) : (
            <p className="error-msg-alternative"></p>
          )}
        </div>
        <div className="condo-creation-wrapper">
          <input
            type="text"
            name="netArea"
            placeholder="Net Area"
            value={formik.values.netArea}
            onChange={formik.handleChange}
          />
          {formik.touched.netArea && formik.errors.netArea ? (
            <p className="error-msg">{formik.errors.netArea}</p>
          ) : (
            <p className="error-msg-alternative"></p>
          )}
        </div>
        <div className="condo-creation-wrapper">
          <input
            type="text"
            name="condoFee"
            placeholder="Condo Fee"
            value={formik.values.condoFee}
            onChange={formik.handleChange}
          />
          {formik.touched.condoFee && formik.errors.condoFee ? (
            <p className="error-msg">{formik.errors.condoFee}</p>
          ) : (
            <p className="error-msg-alternative"></p>
          )}
        </div>
        <textarea
          className="extra-information-textarea"
          name="extraInformation"
          placeholder="Add extra information here"
        />
        <button type="submit">Create Condo Unit</button>
      </form>
    </div>
  );
};

export default CondoCreation;
