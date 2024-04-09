import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../src/Style/LandingPageStyle/BudgetReportLandingPageStyle.css";

const BudgetReportLandingPage = () => {
    const [properties, setProperties] = useState<any[]>([]);
    const [condoData, setCondoData] = useState<any[]>([]);
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const companyId = JSON.parse(localStorage.getItem('companyDetails') || '[]')[0]?.id;
    const token = userData.accessToken;

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/properties`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      params: {
                        where: {
                          company: {
                            id: parseInt(companyId), // Parse companyId to intege
                          },
                        },
                      },
                    }
                  );
                  setProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } 
        };

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
            }
          };

        fetchProperties();
        fetchCondoData();
    }, [companyId, properties, token]); 

    return (
        <div className="budget-report-container">
          <div className="budget-report-header">
            <h1>Operational Budget Report</h1>
          </div>
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
        </div>
      );
}

export default BudgetReportLandingPage;
