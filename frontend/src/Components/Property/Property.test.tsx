import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import PropertyComponent from "./Property";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("PropertyComponent", () => {
  const property = {
    id: 1,
    name: "Windcreek Villa",
    address: "123 Main Street, Cityville",
    unitCount: "50",
    parkingSpotCount: "100",
    lockerCount: "25",
    imageUrl: "Assets/property1.png",
  };

  test("renders property component with correct name and address", () => {
    const onClickMock = jest.fn(); // Mock the onClick function
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <PropertyComponent property={property} onClick={onClickMock} />
      </MemoryRouter>
    );
    const propertyItem = getByTestId("property-component");
    const nameElement = getByText(property.name);
    const addressElement = getByText(property.address);

    expect(propertyItem).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(addressElement).toBeInTheDocument();
  });

  test("renders property image with correct alt text", () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <PropertyComponent property={property} onClick={() => {}} />
      </MemoryRouter>
    );
    const propertyImage = getByAltText(property.name);

    expect(propertyImage).toBeInTheDocument();
    expect(propertyImage.getAttribute("src")).toBe(property.imageUrl);
  });
});
