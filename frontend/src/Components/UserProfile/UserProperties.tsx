import "../../Style/UserProfileStyle/UserPropertiesStyle.css";
import React, { useState } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';

interface Property {
    id: number;
    image: string;
    title: string;
    rentPrice: number;
    description: string;
}

const Properties: React.FC = () => {
    const defaultProfilePicturePath = "/Assets/default-property-image.webp";

    const defaultProperty: Property = {
        id: 0,
        image: defaultProfilePicturePath,
        title: 'Beautiful 3 1/3 condo',
        rentPrice: 2000,
        description: 'This condo is modern luxury in the heart of the city. Step into an urban oasis where floor-to-ceiling windows bathe the living spaces in natural light.',
    };

    const [property, setProperty] = useState<Property>(defaultProperty);
    const [liked, setLiked] = useState<boolean>(false);

    const handleLikeClick = () => {
        setLiked((prevLiked) => !prevLiked);
    };

    const handleMessageClick = () => {
        console.log(`Messaging about ${property.title}`);
    };

    return (
        <div>
            <h2 className="property-header">Condos</h2>
            <div className="property-box">
                <div className="property-content">
                    <div className="image-container">
                        <img src={property.image} alt={property.title} className="property-image" />
                    </div>
                    <div className="text-container">
                        <div className="property-details">
                            <h2 className="property-title">{property.title}</h2>
                            <p className="property-rent-price">${property.rentPrice} per month</p>
                            <p className="property-description">{property.description}</p>
                        </div>
                    </div>
                </div>
                <div className="property-actions">
                    <div className="action-container">
                        <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
                            <FaHeart /> {liked ? 'Unlike' : 'Like'}
                        </button>
                        <button className="message-button" onClick={handleMessageClick}>
                            <FaComment /> Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Properties;


