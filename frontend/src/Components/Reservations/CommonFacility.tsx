// CommonFacility.tsx
import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { createCommonFacilitySchema } from '../Common/ValidationSchema';
import { useNavigate } from 'react-router-dom';
import "../../Style/LandingPageStyle/CommonFacilityCreationLandingPageStyle.css";
import CondoCarousel from '../CondoProfile/CondoCarousel';


interface CommonFacilityFormValues {
  propertyName: string;
  facility: string;
  status: 'Open' | 'Closed' | '';
}

const CommonFacility = () => {
  const navigate = useNavigate();

  const formik = useFormik<CommonFacilityFormValues>({
    initialValues: {
      propertyName: '',
      facility: '',
      status: '', // default status
    },
    validationSchema: createCommonFacilitySchema,
    onSubmit: (values) => {
      // Perform the POST request using axios
      console.log("clicked");
      axios.post('/api/path-for-common-facility', values)
        .then(response => {
          console.log(response);
          navigate('/success-page'); // Replace with your success page route
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
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
                <input
                  id="facility"
                  name="facility"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.facility}
                  placeholder='Facility'
                />
            </div>
            {formik.touched.facility && formik.errors.facility ? (
                <div className="error">{formik.errors.facility}</div>
              ) : null}
      
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
