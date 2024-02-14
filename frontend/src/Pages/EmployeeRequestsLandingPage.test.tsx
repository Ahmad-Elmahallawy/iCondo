// EmployeeRequestsLandingPage.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import EmployeeRequestsLandingPage from "./EmployeeRequestsLandingPage";

describe("EmployeeRequestsLandingPage component", () => {
  it("renders without crashing", () => {
    render(<EmployeeRequestsLandingPage />);
  });

  it("updates selectedUserName state when a user is clicked", () => {
    const { getByText } = render(<EmployeeRequestsLandingPage />);
    const userButton = getByText("John Doe"); // Assuming 'John Doe' is one of the user names rendered
    fireEvent.click(userButton);
    expect(userButton).toHaveClass("selected");
  });
});
