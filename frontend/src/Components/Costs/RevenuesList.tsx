// RevenuesList.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api";
import "../../Style/CostsStyle/RevenuesListStyle.css"

interface RevenuesListProps {
  setTotalRevenues: (total: number) => void;
}

const RevenuesList: React.FC<RevenuesListProps> = ({ setTotalRevenues }) => {
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

      // Calculate the total revenue after condoData is fetched
      useEffect(() => {
        if (!loading) {
          const totalRevenue = condoData.reduce(
            (sum, condo) => sum + (condo.condoFee * 12), 
            null
          );
          setTotalRevenues(totalRevenue);
        }
      }, [condoData, loading, setTotalRevenues]);

    return (
        <div className="revenues-list-container">
          <div className="revenues-list-header">
            <h1>Revenues</h1>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
          <div className="revenues-list-table-container">
            <table className="revenues-list-table">
              <thead>
                <tr>
                  <th>Condo Units (ID)</th>
                  <th>Revenue ($)</th>
                </tr>
              </thead>
              <tbody>
                {condoData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.condoFee * 12}</td>
                  </tr>
                ))}
                {/* Add a row for total revenue */}
                <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>{condoData.reduce((sum, condo) => sum + (condo.condoFee * 12), 0)}</strong></td>
                  </tr>
              </tbody>
            </table>
          </div>
          )}
        </div>
      );
}

export default RevenuesList;