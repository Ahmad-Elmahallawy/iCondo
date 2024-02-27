import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../Style/CondoStyle/CondoStyle.css";

interface Condo {
  condoId: number;
  condoFee: string;
  imageUrl: string;
}

const CondoComponent: React.FC<{ condo: Condo }> = ({ condo }) => {
  return (
    <Link to={"/GenerateKey"} state={{ condoId: condo.condoId }}>
      <div className="condo-container" data-testid="condo-component">
        <img src={"/Assets/condo1.svg"} alt={`Condo`} className="item-image" />
        <div className="condo-details">
          <h3 className="item-title">Condo {condo.condoId}</h3>
          <p className="condo-fee">Condo Fee: {condo.condoFee}</p>
        </div>
      </div>
    </Link>
  );
};

export default CondoComponent;
