import React, { useState, useEffect } from 'react';
import "../../Style/CostsStyle/ProfitsStyle.css";

interface ProfitsProps {
  totalRevenues: number | null;
  totalExpenses: number | null;
}

const Profits: React.FC<ProfitsProps> = ({ totalRevenues, totalExpenses }) => {
  const [loading, setLoading] = useState(true);

  console.log(totalRevenues, totalExpenses)

  useEffect(() => {
    // Simulating a check if totalRevenues and totalExpenses have been passed
    if (totalRevenues !== null && totalExpenses !== null) {
      setLoading(false);
    }
  }, [totalRevenues, totalExpenses]);

  const netProfit = totalRevenues && totalExpenses ? totalRevenues - totalExpenses : 0;

  return (
    <div className="profits-container">
        <div className="profits-header">
            <h1>Profits</h1>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="profits-table-container">
            <table className="profits-table">
              <tbody>
                  <tr>
                      <th>Total Revenues</th>
                      <td>${totalRevenues?.toLocaleString()}</td>
                  </tr>
                  <tr>
                      <th>Total Expenses</th>
                      <td>${totalExpenses?.toLocaleString()}</td>
                  </tr>
                  <tr>
                      <th>Net Profit</th>
                      <td>${netProfit.toLocaleString()}</td>
                  </tr>
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default Profits;
