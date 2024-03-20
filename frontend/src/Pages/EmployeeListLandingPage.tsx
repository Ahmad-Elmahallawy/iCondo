import React, { useState, useEffect } from "react";
import api from "../api";
import "../../src/Style/EmployeeListStyle/EmployeeListLandingPageStyle.css";

const EmployeeListLandingPage = () => {
    const [employees, setEmployees] = useState<any[]>([]);
    const user = JSON.parse(localStorage.getItem("userData") || "{}");
    const companyDetails = JSON.parse(localStorage.getItem("companyDetails") || "{}");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await api.employeeRegistration.getCompanyEmployees(
                    companyDetails[0].company.id,
                    user.accessToken
                );

                const userIds: number[] = response.map((emp: { user: { id: string } }) => emp.user.id);
                const userInfoResponses = await Promise.all(
                    userIds.map((userId: number) =>
                        api.userInformation.getUserInfo(userId, user.accessToken)
                    )
                );

                const updatedEmployees = userInfoResponses.map(userInfo => ({
                    employeeId: userInfo.data.id,
                    firstName: userInfo.data.firstName,
                    lastName: userInfo.data.lastName,
                    phoneNumber: userInfo.data.phoneNumber,
                    username: userInfo.data.username,
                    roles: userInfo.data.roles,
                    email: userInfo.data.email,
                }));

                setEmployees(updatedEmployees);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching employees:", error);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h1 className="employee-list-header">Employee List</h1>
            <div className="table-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>No Employees</td>
                                </tr>
                            ) : (
                                employees.map((employee) => (
                                    <tr key={employee.employeeId}>
                                        <td>{employee.employeeId}</td>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.phoneNumber}</td>
                                        <td>{employee.username}</td>
                                        <td>{employee.roles.join(', ')}</td>
                                        <td>{employee.email}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default EmployeeListLandingPage;
