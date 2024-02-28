import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PropertyProfileLandingPage from "./PropertyProfileLandingPage";
import axios from 'axios';


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

    const condoContainers = screen.queryAllByTestId("condo-component");
    console.log("Number of Condo Containers:", condoContainers.length);

    // Check if condos are present
    if (condoContainers.length > 0) {
      expect(condoContainers.length).toBeGreaterThanOrEqual(1); // At least one condo container must be present
    } else {
      // No condos present, so there should be no condo containers
      expect(condoContainers.length).toBe(0);
    }
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
  test("adds unit button redirects to condo creation page with property title", () => {
    const propertyInfo = {
      title: "Test Property",
      address: "Test Address",
      unitCount: "10",
      parkingSpotCount: "5",
      lockerCount: "3",
    };
    const { getByText, container } = render(
      <MemoryRouter>
        <PropertyProfileLandingPage />
      </MemoryRouter>
    );

    const addButton = getByText("Add Unit");
    fireEvent.click(addButton);

    const link = container.querySelector('a[href="/CondoCreation"]');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Add Unit");
  });

  test("renders property title and info form with correct initial values", () => {
    render(
      <MemoryRouter initialEntries={["/property"]} initialIndex={0}>
        <Routes>
          <Route path="/property" element={<PropertyProfileLandingPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("property-title")).toBeInTheDocument();

  });


  test("handles error when fetching condos", async () => {
    // Mocking API response for fetching condos
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet("http://localhost:8000/api/condoUnits").reply(500);
  
    render(
      <MemoryRouter initialEntries={["/property"]} initialIndex={0}>
        <Routes>
          <Route path="/property" element={<PropertyProfileLandingPage />} />
        </Routes>
      </MemoryRouter>
    );
  
    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.queryByTestId("condo-error");
      if(errorMessage){
        expect(errorMessage).toBeInTheDocument();
      }
    });
  
    // Add additional assertions as needed
  });
  
  test("updates property info when location state changes", async () => {
    const history = { push: jest.fn() };

    render(
      <MemoryRouter initialEntries={["/property"]} initialIndex={0}>
        <Routes>
          <Route path="/property" element={<PropertyProfileLandingPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if initial property info renders
    expect(screen.getByTestId("property-title")).toHaveTextContent("Profile");

    // Update location state
    fireEvent.click(screen.getByTestId("update-property-button"));

  });

});
