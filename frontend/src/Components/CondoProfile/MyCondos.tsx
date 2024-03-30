import { useEffect, useState } from "react";
import CondoCarousel from "./CondoCarousel";
import api from "../../api";

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
      <CondoCarousel condos={property} />
    </div>
  );
};

export default MyCondos;
