import React, { useEffect, useState } from 'react';
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

interface Property {
  id: string;  // Adjust the type if necessary
  name: string;
}

const CommonFacility = () => {
  const navigate = useNavigate();
  const companyId = JSON.parse(localStorage.getItem('companyDetails') || '[]')[0]?.id;
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const token = userData.accessToken;

  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchPropertyNames = async () => {
      try {
        const response = await api.properties.getAllProperties(
          parseInt(companyId), 
          token
        );
        console.log(response.data);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching property names', error);
      }
    };

    fetchPropertyNames();
  }, []); 

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
          parseInt(values.propertyName),
          values.status,
          token
        );
        //TODO: navigate to next page
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
              <select
                id="propertyName"
                name="propertyName"
                onChange={formik.handleChange}
                value={formik.values.propertyName}
              >
                <option value="" disabled>Properties</option>
                {properties.map(property => (
                  <option key={property.id} value={property.id}>{property.name}</option>
                ))}
              </select>
              {formik.touched.propertyName && formik.errors.propertyName ? (
                <div className="error">{formik.errors.propertyName}</div>
              ) : null}
            </div>   
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
