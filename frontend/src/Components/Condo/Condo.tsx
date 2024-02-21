import React from "react";
import "../../Style/CondoStyle/CondoStyle.css";

interface Condo {
  condoId: number;
  occupantName: string;
  condoFee: string;
  imageUrl: string;
}

const CondoComponent: React.FC<{ condo: Condo }> = ({ condo }) => {
  return (
    <div className="condo-container" data-testid="condo-component">
      <img
        src={condo.imageUrl}
        alt={`Condo ${condo.condoId}`}
        className="item-image"
      />
      <div className="condo-details">
        <h3 className="item-title">Condo {condo.condoId}</h3>
        <p className="condo-occupant">Occupant: {condo.occupantName}</p>
        <p className="condo-fee">Condo Fee: {condo.condoFee}</p>
      </div>
    </div>
  );
};

export default CondoComponent;
