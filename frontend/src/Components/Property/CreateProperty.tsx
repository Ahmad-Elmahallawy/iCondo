import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios"; // HTTP client
import { createPropertyInitialValues } from "../Common/InitialValues";
import { createPropertyValidationSchema } from "../Common/ValidationSchema";
import "../../Style/CreatePropertyStyle/CreatePropertyStyle.css";
import { useNavigate } from "react-router-dom";

// CreateProperty Component:
// This component renders a form to create a new property.
// It utilizes Formik for form management and validation.
// The component includes inputs for property name, address, unit count, parking count, locker count,
// and allows users to upload files related to the property.
const CreateProperty: React.FC = () => {
  const deleteIcon = "/Assets/delete.svg";
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  // Formik form initialization
  const formik = useFormik({
    initialValues: { ...createPropertyInitialValues, files: [] },
    validationSchema: createPropertyValidationSchema,
    onSubmit: async (values) => {
      try {

        const data = {
          address: values.address,
          lockerCount: Number(values.lockerCount),
          name: values.propertyName,
          parkingCount:  Number(values.parkingCount),
          unitCount: Number(values.unitCount)
        };

        const userData = JSON.parse(localStorage.getItem("userData")|| "{}");
        const token =  userData.accessToken;
        const propertiesEndpoint = "http://localhost:8000/api/properties"; 

        const response = await axios.post(propertiesEndpoint, data, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
    
        console.log("Property created successfully");
        navigate("/PropertiesList");
      } catch (error: any) {
        console.error("There was a problem creating the property:", error.message);
      }
    }
    
  });

  // Handler for file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  // Handler for deleting selected file
  const handleFileDelete = (fileName: string) => {
    setSelectedFiles(selectedFiles.filter((file) => file.name !== fileName));
  };

  // Drag and drop event handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  return (
    <div
      className="create-property-container"
      data-testid="create-property-component"
    >
      <h2>Create Property</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="create-property-input">
          <input
            type="text"
            name="propertyName"
            value={formik.values.propertyName}
            onChange={formik.handleChange}
            placeholder="Property Name"
          />
          {formik.touched.propertyName && formik.errors.propertyName ? (
            <p className="error-msg">{formik.errors.propertyName}</p>
          ) : null}
        </div>
        <div className="create-property-input">
          <input
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            placeholder="Address"
          />
          {formik.touched.address && formik.errors.address ? (
            <p className="error-msg">{formik.errors.address}</p>
          ) : null}
        </div>
        <div className="create-property-input">
          <input
            type="text"
            name="unitCount"
            value={formik.values.unitCount}
            onChange={formik.handleChange}
            placeholder="Unit Count"
          />
          {formik.touched.unitCount && formik.errors.unitCount ? (
            <p className="error-msg">{formik.errors.unitCount}</p>
          ) : null}
        </div>
        <div className="create-property-input">
          <input
            type="text"
            name="parkingCount"
            value={formik.values.parkingCount}
            onChange={formik.handleChange}
            placeholder="Parking Count"
          />
          {formik.touched.parkingCount && formik.errors.parkingCount ? (
            <p className="error-msg">{formik.errors.parkingCount}</p>
          ) : null}
        </div>
        <div className="create-property-input">
          <input
            type="text"
            name="lockerCount"
            value={formik.values.lockerCount}
            onChange={formik.handleChange}
            placeholder="Locker Count"
          />
          {formik.touched.lockerCount && formik.errors.lockerCount ? (
            <p className="error-msg">{formik.errors.lockerCount}</p>
          ) : null}
        </div>
        <div
          className="create-property-file"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          data-testid="create-property-file"
        >
          <label className="custom-file-upload">
            <input
              type="file"
              onChange={handleFileChange}
              data-testid="file-input"
            />
            Upload File
          </label>
          <div className="create-property-drag-drop">
            <p>Or drag and drop files here</p>
          </div>
        </div>

        <div className="selected-files-container">
          {selectedFiles.map((file) => (
            <div key={file.name} className="selected-file-row">
              <p>{file.name}</p>
              <button
                type="button"
                className="delete-file"
                onClick={() => handleFileDelete(file.name)}
              >
                <img src={deleteIcon} alt="Delete" />
              </button>
            </div>
          ))}
        </div>

        <div className="create-property-upload">
          <button type="submit" data-testid="submit-button">
            Create Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProperty;
