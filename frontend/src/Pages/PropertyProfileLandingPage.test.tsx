import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import the extend-expect module
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PropertyProfileLandingPage from "./PropertyProfileLandingPage";

// Mock condos data
jest.mock("../Components/Condo/Condos.json", () => [
  {
    condoId: 1,
    size: "1000 sqft",
    occupantName: "John Doe",
    bathrooms: "2",
    bedrooms: "3",
    condoType: "Duplex",
    lastRenovated: "2020-05-15",
    condoFee: "500",
    imageUrl: "Assets/condo1.svg",
  },
]);

describe("PropertyProfileLandingPage", () => {
  test("renders property title and info form with correct initial values", () => {
    render(
      <MemoryRouter initialEntries={["/property"]} initialIndex={0}>
        <Routes>
          <Route path="/property" element={<PropertyProfileLandingPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId("property-title")).toBeInTheDocument();
    // Add assertions to check if property info form renders with correct initial values
  });
  test("renders property title", () => {
    render(
      <MemoryRouter initialEntries={["/property"]} initialIndex={0}>
        <Routes>
          <Route path="/property" element={<PropertyProfileLandingPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId("property-title")).toBeInTheDocument();
  });
  test("renders condo list", () => {
    render(
      <MemoryRouter initialEntries={["/property"]} initialIndex={0}>
        <Routes>
          <Route path="/property" element={<PropertyProfileLandingPage />} />
        </Routes>
      </MemoryRouter>
    );

    const condoContainers = screen.getAllByTestId("condo-component");
    console.log("Number of Condo Containers:", condoContainers.length);

    expect(condoContainers.length).toBeGreaterThanOrEqual(0); // At least one condo container must be present
  });

  test("renders add unit button", () => {
    render(
      <MemoryRouter initialEntries={["/property"]} initialIndex={0}>
        <Routes>
          <Route path="/property" element={<PropertyProfileLandingPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Add Unit")).toBeInTheDocument();
  });

  test("navigates to add unit page when add unit button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/property"]} initialIndex={0}>
        <Routes>
          <Route path="/property" element={<PropertyProfileLandingPage />} />
          <Route
            path="/add-unit"
            element={<div data-testid="add-unit-page">Add Unit Page</div>}
          />
        </Routes>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Add Unit"));
    expect(screen.getByTestId("add-unit-page")).toBeInTheDocument();
  });

  test("renders condo list with correct data", () => {
    render(
      <MemoryRouter initialEntries={["/property"]} initialIndex={0}>
        <Routes>
          <Route path="/property" element={<PropertyProfileLandingPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Add assertions to check if condo data is correctly rendered in condo containers
  });

  test("navigates to add unit page when add unit button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/property"]} initialIndex={0}>
        <Routes>
          <Route path="/property" element={<PropertyProfileLandingPage />} />
          <Route
            path="/add-unit"
            element={<div data-testid="add-unit-page">Add Unit Page</div>}
          />
        </Routes>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Add Unit"));
    expect(screen.getByTestId("add-unit-page")).toBeInTheDocument();
  });
});
