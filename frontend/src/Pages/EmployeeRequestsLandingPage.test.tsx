// EmployeeRequestsLandingPage.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import EmployeeRequestsLandingPage from "./EmployeeRequestsLandingPage";

describe("EmployeeRequestsLandingPage component", () => {
  it("renders without crashing", () => {
    render(<EmployeeRequestsLandingPage />);
  });


});
