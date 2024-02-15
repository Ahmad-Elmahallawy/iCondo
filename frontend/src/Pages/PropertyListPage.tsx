// PropertyListPage.tsx
import React, { useState } from "react";
import PropertyComponent from "../Components/Property/Property";
import { Button } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import properties from "../Components/Property/Properties.json"; 
import "../Style/PropertyListStyle/PropertyListPageStyle.css";

const PropertyListPage = () => {
    const [startIndex, setStartIndex] = useState(0);
  
    const handleScroll = (direction: "prev" | "next") => {
      if (direction === "prev") {
        setStartIndex((prevIndex) =>
          prevIndex - 4 >= 0 ? prevIndex - 4 : 0
        );
      } else {
        setStartIndex((prevIndex) =>
          prevIndex + 4 < properties.length ? prevIndex + 4 : prevIndex
        );
      }
    };
  
    return (
      <div className="property-list-page" data-testid="property-list-page">
        <h1>Properties List</h1>
        <div className="properties-container" data-testid="property-component">
          {properties.slice(startIndex, startIndex + 4).map((property) => (
            <div key={property.id} className="property-wrapper">
              <PropertyComponent property={property} />
            </div>
          ))}
        </div>
        <div className="button-container">
          <Button
            data-testid="prev-button"
            className="scroll-button prev-button"
            onClick={() => handleScroll("prev")}
            disabled={startIndex === 0}
          >
            <NavigateBefore className="nav-icon" />
          </Button>
          <Button
            data-testid="next-button"
            className="scroll-button next-button"
            onClick={() => handleScroll("next")}
            disabled={startIndex + 4 >= properties.length}
          >
            <NavigateNext className="nav-icon" />
          </Button>
        </div>
        <span data-testid="start-index" style={{ display: "none" }}>{startIndex}</span>
      </div>
    );
  };
  
export default PropertyListPage;
