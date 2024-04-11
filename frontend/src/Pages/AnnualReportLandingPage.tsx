import React, { useState } from "react";
import RevenuesList from "../Components/Costs/RevenuesList";
import ExpensesList from "../Components/Costs/ExpensesList";
import Profits from "../Components/Costs/Profits";
import "../Style/LandingPageStyle/AnnualReportLandingPageStyle.css"

const AnnualReportLandingPage = () => {
    const [totalRevenues, setTotalRevenues] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);

    return (
        <div className="annual-report-landing-page">
            <div className="annual-report-header">
                <h1>Annual Report 2024</h1>
            </div>
            <div className="annual-report-content">
                <RevenuesList setTotalRevenues={setTotalRevenues} />
                <ExpensesList setTotalExpenses={setTotalExpenses} />
                <Profits totalRevenues={totalRevenues} totalExpenses={totalExpenses} />
            </div>
        </div>
    )
}

export default AnnualReportLandingPage;