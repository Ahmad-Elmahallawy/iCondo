// Square.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../Style/Dashboard/SquareCardStyle.css'; 

interface SquareProps {
  title: string;
  icon: string;
  route: string;
}

const SquareCard: React.FC<SquareProps> = ({ title, icon, route }) => {
    return (
      <Link to={route} className="square-link">
        <div className="square">
          <img src={icon} alt="Icon" className="icon"/>
          <h2 className="title">{title}</h2>
        </div>
      </Link>
    );
  };
  
export default SquareCard;
