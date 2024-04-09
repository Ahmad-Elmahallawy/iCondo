import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api";
import "../../src/Style/LandingPageStyle/BudgetReportLandingPageStyle.css";

const BudgetReportLandingPage = () => {
    const [properties, setProperties] = useState<any[]>([]);
    const [condoData, setCondoData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const companyId = JSON.parse(localStorage.getItem('companyDetails') || '[]')[0]?.id;
    const token = userData.accessToken;

    useEffect(() => {
      const fetchProperties = async () => {
          try {
            const response = await api.properties.getAllProperties(
              parseInt(companyId), 
              token
            );
            setProperties(response.data);
          } catch (error) {
            console.error("Error fetching properties:", error);
          }
      };
      fetchProperties();
    }, [token, companyId]);

    useEffect(() => {
      // Only run this effect if properties is not empty
      if (properties.length === 0) {
        return;
      }
      const fetchCondoData = async () => {
          try {
              const condoDataPromises = properties.map(async (propertyInfo) => {
                  const response = await axios.get(
                      `${process.env.REACT_APP_API_URL}/condoUnits`,
                      {
                        params: {
                          where: {
                            propertyID: {
                              id: propertyInfo.id,
                            },
                          },
                        },
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                  );
                  return response.data.map((condo: any) => ({
                      id: condo.id,
                      condoFee: condo.condoFee
                  }));
              });
              const condoDataResults = await Promise.all(condoDataPromises);
              setCondoData(condoDataResults.flat());

          } catch (error) {
            console.error("Error fetching condos:", error);
          } finally {
            setLoading(false);
          }
      };
      
      fetchCondoData();
    }, [properties, token]); 

    return (
        <div className="budget-report-container">
          <div className="budget-report-header">
            <h1>Operational Budget Report</h1>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="budget-report-table-container">
              <table className="budget-report-table">
                <thead>
                  <tr>
                    <th>Condo Units (ID)</th>
                    <th>Condo Fees ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {condoData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.condoFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
}

export default BudgetReportLandingPage;
