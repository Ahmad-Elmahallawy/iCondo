import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../Style/PropertyProfileStyle/CondoFilesModalStyle.css";

export default function CondoFilesModal(props: any) {
  const { isCondoFilesOpen, handleClose } = props;
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles: File[] = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
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
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
