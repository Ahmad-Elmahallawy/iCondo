import React from "react";
import { useFormik } from "formik";
import { condoInitialValues } from "../Common/InitialValues";
import { condoValidationSchema } from "../Common/ValidationSchema";

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
      <div className="condo-creation-property-name-and-company-name"></div>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Condo Unit Number:
          <input
            type="text"
            name="unitNumber"
            value={formik.values.unitNumber}
            onChange={formik.handleChange}
          />
          {formik.errors.unitNumber && formik.touched.unitNumber && (
            <div>{formik.errors.unitNumber}</div>
          )}
        </label>
        <label>
          Net Area:
          <input
            type="number"
            name="netArea"
            value={formik.values.netArea}
            onChange={formik.handleChange}
          />
          {formik.errors.netArea && formik.touched.netArea && (
            <div>{formik.errors.netArea}</div>
          )}
        </label>
        <label>
          Condo Fee:
          <input
            type="number"
            name="condoFee"
            value={formik.values.condoFee}
            onChange={formik.handleChange}
          />
          {formik.errors.condoFee && formik.touched.condoFee && (
            <div>{formik.errors.condoFee}</div>
          )}
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CondoCreation;
