import { useEffect, useState } from "react";
import api from "../../api";
import List from "../Common/List";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface CondoInfo {
  condo: {
    id: number;
  };
  createdAt: string;
  id: number;
  updatedAt: string;
  user: {
    id: number;
  };
}

const defaultCondo: Array<CondoInfo> = [
  {
    condo: {
      id: 1,
    },
    createdAt: "2024-03-19T21:11:38.889Z",
    id: 1,
    updatedAt: "2024-03-19T21:11:38.889Z",
    user: {
      id: 5,
    },
  },
  {
    condo: {
      id: 2,
    },
    createdAt: "2024-03-19T21:11:38.889Z",
    id: 1,
    updatedAt: "2024-03-19T21:11:38.889Z",
    user: {
      id: 5,
    },
  },
  {
    condo: {
      id: 3,
    },
    createdAt: "2024-03-19T21:11:38.889Z",
    id: 1,
    updatedAt: "2024-03-19T21:11:38.889Z",
    user: {
      id: 5,
    },
  },
];

const MyCondos = () => {
  const [property, setProperty] = useState<Array<CondoInfo>>(defaultCondo);
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const navigate = useNavigate();
  const defaultProfilePicturePath = "/Assets/default-property-image.webp";
  useEffect(() => {
    let mounted = true;
    api.userCondoList
      .getOwnerCondos(user.id, user.accessToken)
      .then((items) => {
        if (mounted) {
          setProperty(items);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleCondoClick = (condo: any) => {
    navigate(`/CondoProfile/${condo.condo.id}`);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <List
        data-testid="add-unit-page"
        items={property}
        renderItem={(condo) => (
          <Box
            key={condo.condo.id}
            sx={{
              maxWidth: 400,
              p: 2,
              border: "1px solid var(--color4)",
              background: "var(--color1)",
              borderRadius: "5px",
              boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
            }}
            onClick={() => handleCondoClick(condo)}
          >
            <Box
              component="img"
              sx={{
                height: 255,
                display: "block",
                maxWidth: 400,
                overflow: "hidden",
              }}
              src={defaultProfilePicturePath}
              alt="Error retrieving image"
            />
            <Typography>{condo.condo.id}</Typography>
            <Typography>{condo.createdAt}</Typography>
          </Box>
        )}
      />
    </div>
  );
};

export default MyCondos;
