import React, { useState } from 'react';
import { useFormik } from 'formik';
import "../../Style/CreatePropertyStyle/CreatePropertyStyle.css";

const CreateProperty: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null); 
    const formik = useFormik({
      initialValues: {
        propertyName: '',
        address: '',
        unitCount: '',
        parkingCount: '',
        lockerCount: '',
      },
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
      <div className="create-property-container">
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
          </div>
          <div className="create-property-input">
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              placeholder="Address"
            />
          </div>
          <div className="create-property-input">
            <input
              type="text"
              name="unitCount"
              value={formik.values.unitCount}
              onChange={formik.handleChange}
              placeholder="Unit Count"
            />
          </div>
          <div className="create-property-input">
            <input
              type="text"
              name="parkingCount"
              value={formik.values.parkingCount}
              onChange={formik.handleChange}
              placeholder="Parking Count"
            />
          </div>
          <div className="create-property-input">
            <input
              type="text"
              name="lockerCount"
              value={formik.values.lockerCount}
              onChange={formik.handleChange}
              placeholder="Locker Count"
            />
          </div>
          <div className="create-property-file">
            <label className="custom-file-upload">
              <input type="file" onChange={handleFileChange} />
              Upload File
            </label>
            <div className="create-property-drag-drop">
              <p>Or drag and drop files here</p>
            </div>
          </div>
          <div className="create-property-upload">
            <button type="submit">Create Property</button>
          </div>
        </form>
      </div>
    );
};

export default CreateProperty;
