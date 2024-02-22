import React, { useState } from 'react';
import { useFormik } from 'formik';
import { createPropertyInitialValues } from "../Common/InitialValues";
import { createPropertyValidationSchema } from "../Common/ValidationSchema";
import "../../Style/CreatePropertyStyle/CreatePropertyStyle.css";

const CreateProperty: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formik = useFormik({
    initialValues: createPropertyInitialValues,
    validationSchema: createPropertyValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      console.log(selectedFile);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="create-property-container" data-testid="create-property-component">
      <h2>Create Property</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="create-property-input">
          <input
            type="text"
            name="propertyName"
            value={formik.values.propertyName}
            onChange={formik.handleChange}
            placeholder="Property Name"
            data-testid="propertyName-input"
          />
          {formik.touched.propertyName && formik.errors.propertyName ? (
            <p className="error-msg" data-testid="propertyName-input-error">{formik.errors.propertyName}</p>
          ) : null}
        </div>
        <div className="create-property-input">
          <input
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            placeholder="Address"
            data-testid="address-input"
          />
          {formik.touched.address && formik.errors.address ? (
            <p className="error-msg" data-testid="address-input-error">{formik.errors.address}</p>
          ) : null}
        </div>
        <div className="create-property-input">
          <input
            type="text"
            name="unitCount"
            value={formik.values.unitCount}
            onChange={formik.handleChange}
            placeholder="Unit Count"
            data-testid="unitCount-input"
          />
          {formik.touched.unitCount && formik.errors.unitCount ? (
            <p className="error-msg" data-testid="unitCount-input-error">{formik.errors.unitCount}</p>
          ) : null}
        </div>
        <div className="create-property-input">
          <input
            type="text"
            name="parkingCount"
            value={formik.values.parkingCount}
            onChange={formik.handleChange}
            placeholder="Parking Count"
            data-testid="parkingCount-input"
          />
          {formik.touched.parkingCount && formik.errors.parkingCount ? (
            <p className="error-msg" data-testid="parkingCount-input-error">{formik.errors.parkingCount}</p>
          ) : null}
        </div>
        <div className="create-property-input">
          <input
            type="text"
            name="lockerCount"
            value={formik.values.lockerCount}
            onChange={formik.handleChange}
            placeholder="Locker Count"
            data-testid="lockerCount-input"
          />
          {formik.touched.lockerCount && formik.errors.lockerCount ? (
            <p className="error-msg" data-testid="lockerCount-input-error">{formik.errors.lockerCount}</p>
          ) : null}
        </div>
        <div className="create-property-file">
          <label className="custom-file-upload">
            <input type="file" onChange={handleFileChange} data-testid="file-input" />
            Upload File
          </label>
          <div className="create-property-drag-drop">
            <p>Or drag and drop files here</p>
          </div>
        </div>
        <div className="create-property-upload">
          <button type="submit" data-testid="submit-button" disabled={Object.keys(formik.errors).length > 0}>Create Property</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProperty;
