import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../Style/PropertyProfileStyle/CondoFilesModalStyle.css";
import axios from "axios";

export default function CondoFilesModal(props: any) {
  const { isCondoFilesOpen, handleClose } = props;
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  React.useEffect(() => {
    if (isCondoFilesOpen) {
      fetchFiles();
    }
  }, [isCondoFilesOpen]);

  const fetchFiles = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const token = userData.accessToken;
      const property = JSON.parse(localStorage.getItem("property") || "{}");
      const id = property.id;
      console.log("id is " + id);
      const getFilesEndpoint = `http://localhost:8000/api/properties/${id}/files`

      const response = await axios.get(
        getFilesEndpoint,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header with token
          },
        }
      );

      setSelectedFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles: File[] = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const postFiles = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const token = userData.accessToken;
      const property = JSON.parse(localStorage.getItem("property") || "{}");
      const id = property.id;
      const postFilesEndpoint = `http://localhost:8000/api/properties/${id}/files`;

      var formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });

      console.log(formData);
      console.log(selectedFiles);
      await axios.post(
        postFilesEndpoint,
        selectedFiles,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header with token
            'Content-Type': 'multipart/form-data'
          },
        }
      );

      // Reset selectedFiles after posting
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error posting files:", error);
    }
  };

  return (
    <Modal
      open={isCondoFilesOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="condo-files-modal">
        <Box className="condo-files-header">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Condo Files
          </Typography>
          <input
            type="file"
            id="file-upload"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />
          <label htmlFor="file-upload">
            <Button component="span" className="condo-files-button">
              Upload File(s)
            </Button>
          </label>
        </Box>
        {selectedFiles.length > 0 ? (
          <div>
            <ul>
              {selectedFiles.map((file, index) => (
                <li
                  className="condo-file-item"
                  key={index}
                  data-testid={"file-item"}
                >
                  <span>{file.name}</span>
                  <a href={URL.createObjectURL(file)} download={file.name}>
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Typography variant="subtitle1">
            No Files Are Available Right Now For This Property
          </Typography>
        )}
        <Button
          className="condo-files-button condo-files-close-button"
          onClick={() => {
            postFiles();
            handleClose();
          }}
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
