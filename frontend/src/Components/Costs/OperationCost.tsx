import React from 'react';
import { useFormik } from 'formik';
import { addCostInitialValues } from '../Common/InitialValues';
import { addCostValidationSchema } from '../Common/ValidationSchema';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import "../../Style/CostsStyle/OperationCostStyle.css";

const OperationCost = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: addCostInitialValues,
    validationSchema: addCostValidationSchema,
    onSubmit: async (values) => {
      const user = JSON.parse(localStorage.getItem('userData') || '{}');
      const companyId = JSON.parse(localStorage.getItem('companyDetails') || '[]')[0].id;
      
      try {
        const response = await api.costs.postCost(
          companyId,
          values.operationName,
          values.operationCost,
          user.accessToken
        );
        // Handle success
        navigate('/CompanyDashboard');
      } catch (error) {
        // Handle error
        console.error('There was an error adding the operation cost:', error);
      }
    },
  });

  return (
    <div className="operation-cost-container">
      <div className="operation-cost-header">
        <h1>Cost for Operation</h1>
      </div>
      <div className="operation-cost-content">
        <form onSubmit={formik.handleSubmit}>
          <div className="operation-cost-name">
            <label htmlFor="operationName">Name of the Operation:</label>
            <input
              id="operationName"
              name="operationName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.operationName}
            />
            {formik.touched.operationName && formik.errors.operationName ? (
              <div>{formik.errors.operationName}</div>
            ) : null}
          </div>
          <div className="operation-cost-value">
            <label htmlFor="operationCost">Cost of the Operation:</label>
            <input
              id="operationCost"
              name="operationCost"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.operationCost}
            />
            {formik.touched.operationCost && formik.errors.operationCost ? (
              <div>{formik.errors.operationCost}</div>
            ) : null}
          </div>
          <div className="operation-cost-submit">
            <button type="submit">Submit Cost</button>
          </div>
        </form>  
      </div>
    </div>
  );
};

export default OperationCost;
