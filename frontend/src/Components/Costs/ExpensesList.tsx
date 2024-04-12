// ExpensesList.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api";
import "../../Style/CostsStyle/ExpensesListStyle.css"

interface ExpensesListProps {
  setTotalExpenses: (total: number) => void;
}

const ExpensesList: React.FC<ExpensesListProps> = ({ setTotalExpenses }) => {
    const [costData, setCostData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const companyId = JSON.parse(localStorage.getItem('companyDetails') || '[]')[0]?.id;
    const token = userData.accessToken;

    useEffect(() => {
        const fetchCosts = async () => {
            try {
              const response = await api.costs.getCosts(
                parseInt(companyId), 
                token
              );
              setCostData(response.data.map((cost: any) => ({
                name: cost.costName,
                amount: parseFloat(cost.amount)
              })));
            } catch (error) {
              console.error("Error fetching Operation Costs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCosts();
      }, [token, companyId]);

    // Calculate total expenses after costData is fetched
    useEffect(() => {
        if (!loading) {
            const totalExpenses = costData.reduce(
                (sum, cost) => sum + cost.amount, 
                null
            );
            setTotalExpenses(totalExpenses);
        }
    }, [costData, loading, setTotalExpenses]);

    return (
        <div className="expenses-list-container">
          <div className="expenses-list-header">
            <h1>Expenses</h1>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
          <div className="expenses-list-table-container">
            <table className="expenses-list-table">
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Expenses ($)</th>
                </tr>
              </thead>
              <tbody>
                {costData.map((data) => (
                  <tr key={data.name}>
                    <td>{data.name}</td>
                    <td>{data.amount}</td> 
                  </tr>
                ))}
                {/* Add a row for total expenses */}
                <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>{costData.reduce((sum, cost) => sum + cost.amount, 0)}</strong></td> 
                  </tr>
              </tbody>
            </table>
          </div>
          )}
        </div>
      );
}

export default ExpensesList;
