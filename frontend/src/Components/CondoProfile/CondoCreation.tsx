// CondoCreation.js
import React, { useState } from "react";
import { useFormik } from "formik";
import { condoInitialValues } from "../Common/InitialValues";
import { condoValidationSchema } from "../Common/ValidationSchema";
import { useLocation } from "react-router-dom";
import "../../Style/CondoProfileStyle/CondoCreationStyle.css";
import { log } from "console";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CondoCreation = () => {
  // Retrieve userData from localStorage
  const userDataString = localStorage.getItem("userData");
  let companyName = "";
  let token = "";
  const location = useLocation();
  const title = location.state ? location.state.title : "";
  const propertyID = location.state ? location.state.id : "";
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // Check if userData exists and is in the expected format
  if (userDataString) {
    try {
      // Parse the userData string into an object
      const userData = JSON.parse(userDataString);

      // Access the username property
      companyName = userData.username;

      //Access the token property
      token = userData.accessToken;
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
  } else {
    console.error("userData not found in localStorage");
  }
  const formik = useFormik({
    initialValues: condoInitialValues,
    validationSchema: condoValidationSchema,
    onSubmit: async (values) => {
      try {
        const data = {
          condoFee: Number(values.condoFee),
          id: Number(values.unitNumber),
          size: String(values.netArea),
          propertyID: {
            id: propertyID,
          },
        };

        const condoUnitsEndpoint = "http://localhost:8000/api/condoUnits";
        const response = await axios.post(condoUnitsEndpoint, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Condo Unit created successfully");
        navigate("/PropertiesList");
      } catch (error: any) {
        if (error.response && error.response.status === 409) {
          setErrorMessage("Invalid condo unit, must be unique");
        } else {
          console.error(
            "There was a problem creating the condo unit:",
            error.message
          );
        }
      }
    },
  });

  return (
    <div className="condo-creation-form-container">
      <div className="condo-creation-property-name-and-company-name">
        <h1>{title}</h1>
        <h2>{companyName}</h2>
      </div>
      {errorMessage && <p className="condo-error-message">{errorMessage}</p>}
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
