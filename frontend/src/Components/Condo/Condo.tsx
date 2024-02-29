import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../Style/CondoStyle/CondoStyle.css";

interface Condo {
  unitNumber: string;
  condoId: number;
  condoFee: string;
  imageUrl: string;
  size: string;
}

const CondoComponent: React.FC<{ condo: Condo }> = ({ condo }) => {
  return (
    <div className="condo-container" data-testid="condo-component">
      <img src={"/Assets/condo1.svg"} alt={`Condo`} className="item-image" />
      <div className="condo-details">
        <h3 className="item-title">Condo Unit Number {condo.unitNumber}</h3>
        <p className="condo-fee">Condo Fee: ${condo.condoFee}</p>
        <p className="condo-fee">
          Condo Net Area: {condo.size}m<sup>2</sup>
        </p>
      </div>
    </div>
  );
};

export default CondoComponent;
