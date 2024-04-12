import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import CompanyCostsLandingPage from "./CompanyCostsLandingPage";

describe("CompanyCostsLandingPage", () => {
  test("renders OperationCost component", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CompanyCostsLandingPage />
      </MemoryRouter>
    );
    const operationCostComponent = getByTestId("operation-cost");
    expect(operationCostComponent).toBeInTheDocument();
  });
});
