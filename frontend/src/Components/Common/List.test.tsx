import React from "react";
import { render, screen } from "@testing-library/react";
import List from "./List";
import CondoComponent from "../Condo/Condo";
import PropertyComponent from "../Property/Property";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("List with CondoComponent", () => {
  const condos = [
    {
      condoId: 1,
      occupantName: "John Doe",
      condoFee: "500",
      imageUrl: "Assets/condo1.svg",
    },
    // Add more mock data if needed
  ];

  test("renders a list of CondoComponents", () => {
    render(
      <MemoryRouter>
        <List
          items={condos}
          renderItem={(condo) => <CondoComponent condo={condo} />}
        />
      </MemoryRouter>
    );
    const condoComponents = screen.getAllByTestId("condo-component");
    expect(condoComponents.length).toBe(condos.length);
  });
});

describe("List with PropertyComponent", () => {
  const properties = [
    {
      id: 1,
      title: "Windcreek Villa",
      address: "123 Main Street, Cityville",
      unitCount: "50",
      parkingSpotCount: "100",
      lockerCount: "25",
      imageUrl: "Assets/property1.png",
    },
    // Add more mock data if needed
  ];
  test("renders a list of PropertyComponents", () => {
    render(
      <MemoryRouter>
        <List
          items={properties}
          renderItem={(property) => (
            <PropertyComponent property={property} onClick={() => {}} />
          )}
        />
      </MemoryRouter>
    );
    const propertyComponents = screen.getAllByTestId("property-component");
    expect(propertyComponents.length).toBe(properties.length);
  });
});
