import React, { useState, useEffect } from "react";
import api from "../api";
import "../../src/Style/LandingPageStyle/FinancialStatusLandingPageStyle.css";

export interface CondoInfo {
    condo: {
      id: number;
    };
    createdAt: string;
    id: number;
    updatedAt: string;
    user: {
      id: number;
    };
  }
  
const defaultCondo: Array<CondoInfo> = [
  {
    condo: {
      id: 1,
    },
    createdAt: "2024-03-19T21:11:38.889Z",
    id: 1,
    updatedAt: "2024-03-19T21:11:38.889Z",
    user: {
      id: 5,
    },
  },
];

export interface IndividualCondo {
    condoFee: string;
    createdAt: string;
    id: number;
    locker: any;
    propertyID: {
      id: number;
    };
    registrationKeys: {
      id: number;
    };
    size: string;
    unitNumber: string;
    updatedAt: string;
    isPaid?: boolean;
  }
  

const FinancialStatusLandingPage = () => {
    const [loading, setLoading] = useState(true);
    const [userCondos, setUserCondos] = useState<Array<CondoInfo>>(defaultCondo);
    const [condoData, setCondoData] = useState<any[]>([]);
    const user = JSON.parse(localStorage.getItem("userData") || "{}");

    console.log(condoData)

    useEffect(() => {
        let mounted = true;
        api.userCondoList
          .getOwnerCondos(user.id, user.accessToken)
          .then((items) => {
            if (mounted) {
              setUserCondos(items);
            }
          });
        return () => {
          mounted = false;
        };
      }, []);

      useEffect(() => {
        let mounted = true;
        if (userCondos.length > 0) {
            Promise.all(userCondos.map((condoInfo) => 
                api.userCondoList.getOwnerSingleCondo(condoInfo.condo.id.toString(), user.accessToken)
            )).then((condoDetails) => {
                if (mounted) {
                    setCondoData(condoDetails);
                }
            })
        }
        return () => {
            mounted = false;
        };
    }, [userCondos]); 
    
    

    return (
        <div className="financial-status-container">
          <div className="financial-status-header">
            <h1>Financial Status</h1>
          </div>
          <div className="financial-status-table-container">
            <table className="financial-status-table">
            <thead>
                <tr>
                <th>Condo Units (ID)</th>
                <th>Condo Fees Status ($)</th>
                </tr>
            </thead>
            <tbody>
                {condoData.map((data) => (
                <tr key={data.id}>
                    <td>{data.unitNumber}</td>
                    <td>{data.isPaid ? "Paid" : "Not Paid"}</td>
                </tr>
                ))}
            </tbody>
            </table>
          </div>
        </div>
      );
}

export default FinancialStatusLandingPage;
