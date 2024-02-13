import React from 'react';
import { Link } from 'react-router-dom';
import '../../Style/CompanyDashboard/IconCardStyle.css'; 

interface IconProps {
  title: string;
  icon: string;
  route: string;
}

const IconCard: React.FC<IconProps> = ({ title, icon, route }) => {
    return (
      <Link to={route} className="square-link">
        <div className="square">
          <img src={icon} alt="Icon" className="icon"/>
          <h2 className="title">{title}</h2>
        </div>
      </Link>
    );
  };
  
export default IconCard;
