import { useEffect, useState } from "react";
import api from "../api";
import IndividualPropertyFacilities from "../Components/CommonFacilities/IndividualFacility";

export interface SinglePropertyFacilities {
  createdAt: string;
  facilityType: string;
  id: string;
  property: { id: number };
  status: string;
  updatedAt: string;
}

export interface PropertyByIdResponse {
  address: string;
  createdAt: string;
  id: number;
  lockerCount: number;
  name: string;
  parkingCount: number;
  unitCount: number;
  updatedAt: string;
}

const FacilitiesStatusPage = () => {
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const [properties, setProperties] = useState<PropertyByIdResponse[]>([]);

  useEffect(() => {
    let mounted = true;
    api.properties.getProperties(user.accessToken).then((data) => {
      if (mounted) {
        setProperties(data);
      }
    });

    return () => {
      mounted = false;
    };
  }, [user.accessToken]);

  return (
    <div className="common-facilities-landing-page">
      <div className="common-facilities-header">
        <h1>Common Facilities Status</h1>
      </div>
      <div className="common-facilities-content">
        {properties.map((property) => {
          return <IndividualPropertyFacilities propertyId={property.id} />;
        })}
      </div>
    </div>
  );
};

export default FacilitiesStatusPage;
