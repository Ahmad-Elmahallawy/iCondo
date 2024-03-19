import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CondoComponent from "../Components/Condo/Condo";
import PropertyInfoForm from "../Components/PropertyProfile/PropertyInfoForm";
import List from "../Components/Common/List";
import "../Style/LandingPageStyle/PropertyProfileLandingPageStyle.css";
import axios from "axios";

interface PropertyInfo {
  id: number;
  name: string;
  address: string;
  unitCount: string;
  parkingCount: string;
  lockerCount: string;
}

interface LinkStateProps {
  state: {
    propertyInfo: PropertyInfo;
  };
}

const PropertyProfileLandingPage: React.FC = () => {
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo>(() => ({
    name: "",
    address: "",
    unitCount: "",
    parkingCount: "",
    lockerCount: "",
    id: 0,
  }));

  const [condos, setCondos] = useState<any[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false); // Track whether the component has mounted
  // State to track API error
  const [apiError, setApiError] = useState<string | null>(null);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const navigate = useNavigate();

  const property = {
    id: propertyInfo.id,
  };

  // Store propertyId in localStorage
  localStorage.setItem("property", JSON.stringify(property));
  // Effect to update propertyInfo when location state changes
  useEffect(() => {
    if (location.state && location.state.property) {
      const receivedPropertyInfo: PropertyInfo = location.state.property;
      setPropertyInfo(receivedPropertyInfo);
    }
  }, [location.state]);
  // Effect to fetch condos data when propertyInfo.id or fetchTrigger changes
  useEffect(() => {
    // Check if component is mounted, propertyInfo.id is truthy, and fetchTrigger is true
    if (isMounted && propertyInfo.id && fetchTrigger) {
      const fetchCondos = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/condoUnits",
            {
              params: {
                where: {
                  propertyID: {
                    id: propertyInfo.id,
                  },
                },
              },
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            }
          );
          setCondos(response.data);

          setApiError(null); // Reset API error state
        } catch (error) {
          console.error("Error fetching condos:", error);
          setApiError("Error fetching condos. Please try again later."); // Set API error state
        }
      };

      fetchCondos(); // Initiate fetch operation
      setFetchTrigger(false); // Reset fetchTrigger after initiating fetch
    } else {
      setIsMounted(true); // Set isMounted to true after the first render
    }
  }, [propertyInfo.id, fetchTrigger, isMounted, user.accessToken]);

  // Function to handle saving property info and trigger fetch
  const handleSavePropertyInfo = async (updatedInfo: any) => {
    setPropertyInfo(updatedInfo);
    const id = updatedInfo.id; //retrieved id of property for the api call

    try {
      const data = {
        address: updatedInfo.address,
        id: Number(updatedInfo.id),
        lockerCount: Number(updatedInfo.lockerCount),
        name: updatedInfo.name,
        parkingCount: Number(updatedInfo.parkingCount),
        unitCount: Number(updatedInfo.unitCount),
      };

      const updatePropertiesEndpoint = `http://localhost:8000/api/properties/${id}`;
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const token = userData.accessToken;

      const response = await axios.patch(updatePropertiesEndpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Property updated successfully");
    } catch (error: any) {
      console.error(
        "There was a problem updating the property:",
        error.message
      );
    }

    setFetchTrigger(true); // Trigger fetch when propertyInfo changes
  };

  const handleCondoClick = (condo: any) => {
    navigate("/CondoProfile", { state: condo });
    console.log(condo);
  };
  return (
    <div className="property-profile-landing-page">
      {/* Property info section */}
      <div className="property-info-section">
        <h1 data-testid="property-title">{propertyInfo.name} Profile</h1>
        <PropertyInfoForm
          propertyInfo={propertyInfo}
          onSave={handleSavePropertyInfo}
        />
      </div>

      {/* Condo list section */}
      <div className="condo-list-section" data-testid="condo-list">
        <h1>Condo List</h1>
        <Link
          to={`/CondoCreation`}
          state={{ title: propertyInfo.name, id: propertyInfo.id }}
        >
          <button className="add-unit-button">Add Unit</button>
        </Link>
        <List
          data-testid="add-unit-page"
          items={condos}
          renderItem={(condo) => (
            <div
              key={condo.id}
              className="condo-wrapper"
              onClick={() => handleCondoClick(condo)}
            >
              <CondoComponent condo={condo} />
            </div>
          )}
        />
      </div>
      {apiError && <div data-testid="condo-error">{apiError}</div>}
    </div>
  );
};

export default PropertyProfileLandingPage;
