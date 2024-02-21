import React from "react";
import "../../Style/ListStyle/CondoStyle.css";

interface Condo {
  condo_id: number;
  occupant_name: string;
  condo_fee: string;
  image_url: string;
}

const CondoComponent: React.FC<{ condo: Condo }> = ({ condo }) => {
  return (
    <div className="condo-container" data-testid="condo-component">
      <img
        src={condo.image_url}
        alt={`Condo ${condo.condo_id}`}
        className="item-image"
      />
      <div className="condo-details">
        <h3 className="item-title">Condo {condo.condo_id}</h3>
        <p className="condo-occupant">Occupant: {condo.occupant_name}</p>
        <p className="condo-fee">Condo Fee: {condo.condo_fee}</p>
      </div>
    </div>
  );
};

export default CondoComponent;
