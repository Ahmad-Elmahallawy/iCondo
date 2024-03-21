import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import "../../Style/CondoProfileStyle/IndividualCondoProfileStyle.css"; // Styles import for the component
import { Button } from "@mui/material";

export interface IndividualCondo {
  condoFee: string;
  createdAt: string;
  id: number;
  locker: any;
  propertyID: {
    id: number;
  };
  registrationKeys: {
    id: number;
  };
  size: string;
  unitNumber: string;
  updatedAt: string;
}

const defaultCondoInfo: IndividualCondo = {
  condoFee: "1000",
  createdAt: "2024-03-21T03:04:37.756Z",
  id: 2,
  locker: null,
  propertyID: {
    id: 1,
  },
  registrationKeys: {
    id: 2,
  },
  size: "90",
  unitNumber: "2",
  updatedAt: "2024-03-21T03:04:37.756Z",
};

const IndividualCondoProfile = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const [condo, setCondo] = useState<IndividualCondo>(defaultCondoInfo);
  const [files, setFiles] = useState<File[]>([]);
  const defaultProfilePicturePath = "/Assets/default-property-image.webp";

  useEffect(() => {
    let mounted = true;
    api.userCondoList
      .getOwnerSingleCondo(id!, user.accessToken)
      .then((condo) => {
        if (mounted) {
          setCondo(condo);
        }
      });
    api.userCondoList.getCondoFiles(user.accessToken).then((files) => {
      if (mounted) {
        setFiles(files);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const downloadFile = (file: File) => {
    const blobUrl = URL.createObjectURL(new Blob(files));
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div style={{ width: "100%" }}>
      <div className="condo-info-container">
        <img
          className="condo-img"
          src={defaultProfilePicturePath}
          alt="Error retrieving"
        />
        <div className="condo-data">
          <div className="condoProfileContainer">
            <h2>Condo Files</h2>
            <div className="input-container">
              <span className="input-label">Unit number:</span>
              <span className="input-label">{condo.unitNumber}</span>
            </div>
            <div className="input-container">
              <span className="input-label">Condo ID:</span>
              <span className="input-label">{condo.id}</span>
            </div>
            <div className="input-container">
              <span className="input-label">Net area:</span>
              <span className="input-label">{condo.size}</span>
            </div>
            <div className="input-container">
              <span className="input-label">Property Id:</span>
              <span className="input-label">{condo.propertyID.id}</span>
            </div>
            <div className="input-container">
              <span className="input-label">Condo Fee:</span>
              <span className="input-label">{condo.condoFee}</span>
            </div>
            <div className="input-container">
              <span className="input-label">Locker ID:</span>
              <span className="input-label">{condo.locker}</span>
            </div>
          </div>

          <div className="condoFilesContainer">
            <h2>Files</h2>
            <div className="input-container">
              {files.map((file) => {
                return (
                  <div className="input-label" data-testid={"file-item"}>
                    <span>{file.name}</span>
                    <Button
                      style={{ backgroundColor: "#3c3633" }}
                      onClick={() => downloadFile(file)}
                      variant="contained"
                      sx={{ mt: 2, mr: 1, mb: 1 }}
                    >
                      Download
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualCondoProfile;
