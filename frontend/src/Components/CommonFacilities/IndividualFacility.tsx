// ExpensesList.tsx
import React, { useState, useEffect } from "react";
import api from "../../api";
import "../../Style/CommonFacilitiesStyle/IndividualFacility.css";
import {
  PropertyByIdResponse,
  SinglePropertyFacilities,
} from "../../Pages/FacilitiesStatusPage";

interface IndividualPropertyFacilitiesProps {
  propertyId: number;
}

export interface UpdateFacilityStatusRequest {
  facilityType: string;
  property: { id: number };
  status: string;
}

const IndividualPropertyFacilities = (
  props: IndividualPropertyFacilitiesProps
) => {
  const { propertyId } = props;
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const [property, setProperty] = useState<PropertyByIdResponse>();
  const [commonFacilities, setCommonFacilities] = useState<
    SinglePropertyFacilities[]
  >([]);

  const fetchFacilities = async () => {
    const facilities = await api.commonFacility.getCommonFacilitiesByPropertyId(
      propertyId,
      user.accessToken
    );
    setCommonFacilities(facilities);
  };

  useEffect(() => {
    let mounted = true;
    api.properties
      .getPropertyById(propertyId, user.accessToken)
      .then((property) => {
        if (mounted) {
          setProperty(property);
        }
      });
    fetchFacilities();

    return () => {
      mounted = false;
    };
  }, [propertyId, user.accessToken]);

  const handleOnClick = async (
    facilityId: String,
    facilityType: String,
    status: String
  ) => {
    const request: UpdateFacilityStatusRequest = {
      facilityType: `${facilityType}`,
      property: {
        id: propertyId,
      },
      status: status === "Open" ? `Closed` : `Open`,
    };
    await api.commonFacility.updateFacilityStatus(
      request,
      facilityId,
      user.accessToken
    );
    fetchFacilities();
  };

  return (
    <div className="facility-list-container">
      <div className="facility-list-header">
        <h1>{property?.name}</h1>
      </div>
      <div className="facility-list-table-container">
        <table className="facility-list-table">
          <thead>
            <tr>
              <th>Facilities</th>
              <th>Facility Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commonFacilities.map((facility) => (
              <tr key={facility.id}>
                <td>{facility.facilityType}</td>
                <td>{facility.status}</td>
                <td>
                  <button
                    className="editButton"
                    onClick={() => {
                      handleOnClick(
                        facility.id,
                        facility.facilityType,
                        facility.status
                      );
                    }}
                  >
                    Switch status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndividualPropertyFacilities;
