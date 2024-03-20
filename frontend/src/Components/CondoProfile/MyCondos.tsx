import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Property {
  id: number;
  image: string;
  title: string;
  rentPrice: number;
  description: string;
}

const MyCondos = () => {
  const defaultProfilePicturePath = "/Assets/default-property-image.webp";

  const defaultProperty: Property = {
    id: 0,
    image: defaultProfilePicturePath,
    title: "Beautiful 3 1/3 condo",
    rentPrice: 2000,
    description:
      "This condo is modern luxury in the heart of the city. Step into an urban oasis where floor-to-ceiling windows bathe the living spaces in natural light.",
  }; // Created placeholder property/condo data for the user profile page

  const [property, setProperty] = useState<Property>(defaultProperty);
  const navigate = useNavigate();
  const handlePropertyClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    navigate(`/CondoProfile/1`);
  };

  return (
    <div>
      <div className="property-box">
        <div className="property-content">
          <div className="image-container" onClick={handlePropertyClick}>
            <img
              src={property.image}
              alt={property.title}
              className="property-image"
            />
          </div>
          <div className="text-container">
            <div className="property-details">
              <h2 className="property-title" data-testid="property-title">
                {property.title}
              </h2>
              <p className="property-rent-price">
                ${property.rentPrice} per month
              </p>
              <p className="property-description">{property.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCondos;
