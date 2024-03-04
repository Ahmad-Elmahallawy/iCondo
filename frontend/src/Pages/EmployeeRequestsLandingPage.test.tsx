// EmployeeRequestsLandingPage.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import EmployeeRequestsLandingPage from "./EmployeeRequestsLandingPage";

describe("EmployeeRequestsLandingPage component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <EmployeeRequestsLandingPage />
      </MemoryRouter>
    );
  });
});
