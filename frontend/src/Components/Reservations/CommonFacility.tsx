// CommonFacility.tsx
import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { createCommonFacilitySchema } from '../Common/ValidationSchema';
import { useNavigate } from 'react-router-dom';
import "../../Style/LandingPageStyle/CommonFacilityCreationLandingPageStyle.css";
import CondoCarousel from '../CondoProfile/CondoCarousel';
import api from '../../api';


interface CommonFacilityFormValues {
  propertyName: string;
  facility: string;
  status: 'Open' | 'Closed' | '';
}

const CommonFacility = () => {
  const navigate = useNavigate();
  const property = JSON.parse(localStorage.getItem("property") || "{}");
  const propertyId = property.id;
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const token = userData.accessToken;

  const formik = useFormik<CommonFacilityFormValues>({
    initialValues: {
      propertyName: '',
      facility: '',
      status: '', 
    },
    validationSchema: createCommonFacilitySchema,
    onSubmit: async (values) => {
      try{
        const newCommonFacility = await api.commonFacility.postCommonFacility(
          values.facility,
          propertyId,
          values.status,
          token
        );
        alert("Common Facility "+ values.propertyName + " has been created");
      } catch(error){
        console.error("Error Creating a new Common Facility", error);
      }
    },
  });

  return (
    <div className="main-container">
        <div className="common-facility-container">
          <h2>New Common Facility</h2>
          <form onSubmit={formik.handleSubmit} className="common-facility-form">
            <div className="form-group">
              <input
                id="propertyName"
                name="propertyName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.propertyName}
                placeholder='Property Name'
              />
            </div>
            {formik.touched.propertyName && formik.errors.propertyName ? (
                <div className="error">{formik.errors.propertyName}</div>
              ) : null}
      
            <div className="form-group">
              <select
                id="facility"
                name="facility"
                onChange={formik.handleChange}
                value={formik.values.facility}
                defaultValue={""}
              >
                <option value="" disabled>Facility</option>
                <option value="sauna">Sauna</option>
                <option value="sky_lounge">Sky Lounge</option>
                <option value="spa_fitness">Spa Fitness</option>
              </select>
              {formik.touched.facility && formik.errors.facility ? (
                <div className="error">{formik.errors.facility}</div>
              ) : null}
            </div>     
            <div className="form-group">
              <select
                id="status"
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
                defaultValue={""}
              >
                <option value="" disabled>Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
              {formik.touched.status && formik.errors.status ? (
                <div className="error">{formik.errors.status}</div>
              ) : null}
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
    </div>
    
  );
};

export default CommonFacility;
