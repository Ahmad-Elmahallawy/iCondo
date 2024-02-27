import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PropertyListPage from "./PropertyListLandingPage";
import "@testing-library/jest-dom/extend-expect";

// Importing properties data
import properties from '../Components/Property/Properties.json';

describe('PropertyListPage Component', () => {
  test('renders properties list page', () => {
    render(
      <MemoryRouter>
        <PropertyListPage />
      </MemoryRouter>
    );
    const propertyListPageElement = screen.getByTestId('property-list-page');
    expect(propertyListPageElement).toBeInTheDocument();
  });

  test('renders heading correctly', () => {
    render(
      <MemoryRouter>
        <PropertyListPage />
      </MemoryRouter>
    );
    const headingElement = screen.getByText('Properties List');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders property list items correctly', () => {
    render(
      <MemoryRouter>
        <PropertyListPage />
      </MemoryRouter>
    );
    const propertyListItems = screen.getAllByTestId('property-component');
    if (properties.length > 4) {
      expect(propertyListItems.length).toBe(4);
    } else {
      expect(propertyListItems.length).toBe(properties.length);
    }
  });
});
