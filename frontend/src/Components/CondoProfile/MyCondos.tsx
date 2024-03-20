import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CondoCarousel from "./CondoCarousel";

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

const MyCondos = () => {
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

  const [property, setProperty] = useState<Array<CondoInfo>>(defaultCondo);
  const navigate = useNavigate();
  const handlePropertyClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    navigate(`/CondoProfile/1`);
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
      <CondoCarousel condos={property} />
    </div>
  );
};

export default MyCondos;
