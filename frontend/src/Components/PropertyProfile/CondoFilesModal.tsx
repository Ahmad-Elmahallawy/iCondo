import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../Style/PropertyProfileStyle/CondoFilesModalStyle.css";
import axios from "axios";

interface File {
  name: string;
  data: Blob; // Change data type to Blob
}

export default function CondoFilesModal(props: any) {
  const { isCondoFilesOpen, handleClose } = props;
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [fetchedFiles, setFetchedFiles] = useState<File[]>([]);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const token = userData.accessToken;
  const property = JSON.parse(localStorage.getItem("property") || "{}");
  const id = property.id;

  React.useEffect(() => {
    if (isCondoFilesOpen) {
      fetchFiles();
    }
  }, [isCondoFilesOpen]);

  const fetchFiles = async () => {
    try {
      const getFilesEndpoint = `${process.env.REACT_APP_API_URL}/files`

      const response = await axios.get(
        getFilesEndpoint,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header with token
          },
          params: {
            where: {
              property: {
                id: id,
              }
            },
          },
          responseType: "json", // Change responseType to json
        }
      );

      const filesData: any[] = response.data; // Assuming filesData is an array of file objects

      if (filesData.length > 0) {
        const files: File[] = filesData.map((fileObj: any) => ({
          name: fileObj.name,
          data: new Blob([JSON.stringify(fileObj.data)], {
            type: "application/json",
          }), // Create blob with appropriate type
        }));
        setFetchedFiles(files);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  //creates a downloadable version of the file to be viewed
  const downloadFile = (file: File) => {
    const blobUrl = URL.createObjectURL(file.data);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles: File[] = Array.from(event.target.files).map((file) => ({
        name: file.name,
        data: file,
      }));
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const postFiles = async () => {
    try {
      const postFilesEndpoint = `${process.env.REACT_APP_API_URL}/files`;

      // Iterate through each selected file
      selectedFiles.forEach(async (file) => {
        const data = {
          file: file.data,
          bucket: "propertyfiles",
          property: {
            id: id,
          },
        };

        await axios.post(postFilesEndpoint, data, {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header with token
            "Content-Type": "multipart/form-data",
          },
        });
      });

      // Reset selectedFiles after posting
      setSelectedFiles([]);
      alert("File(s) uploaded successfully");
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
        {selectedFiles.length > 0 && (
          <div>
            <ul>
              {selectedFiles.map((file, index) => (
                <li
                  className="condo-file-item"
                  key={index}
                  data-testid={"file-item"}
                >
                  <span>{file.name}</span>
                  <Button
                    style={{ backgroundColor: '#3c3633' }}
                    onClick={() => downloadFile(file)}
                    variant="contained"
                    sx={{ mt: 2, mr: 1, mb: 1 }}
                  >
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {fetchedFiles.length > 0 ? (
          <div>
            <ul>
              {fetchedFiles.map((file, index) => (
                <li
                  className="condo-file-item"
                  key={index}
                  data-testid={"file-item"}
                >
                  <span>{file.name}</span>
                  <Button
                    style={{ backgroundColor: '#3c3633' }}
                    onClick={() => downloadFile(file)}
                    variant="contained"
                    sx={{ mt: 2, mr: 1, mb: 1 }}
                  >
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Typography variant="subtitle1">
            No Files Are Available Right Now For This Property
          </Typography>
        )}
        <Box>
          {" "}
          <Button
            className="condo-files-button condo-files-close-button"
            onClick={() => {
              postFiles();
            }}
            sx={{ mt: 2, mr: 2 }}
          >
            Submit
          </Button>
          <Button
            className="condo-files-button condo-files-close-button"
            onClick={() => {
              handleClose();
            }}
            sx={{ mt: 2, ml: 1 }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
