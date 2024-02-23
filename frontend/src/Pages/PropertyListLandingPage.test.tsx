import { render, screen, fireEvent } from "@testing-library/react";
import PropertyListPage from "./PropertyListLandingPage";
import "@testing-library/jest-dom/extend-expect";

// Importing properties data
import properties from '../Components/Property/Properties.json';

describe('PropertyListPage Component', () => {
  test('renders properties list page', () => {
    const { getByTestId } = render(<PropertyListPage />);
    const propertyListPageElement = getByTestId('property-list-page');
    expect(propertyListPageElement).toBeInTheDocument();
  });

  test('renders heading correctly', () => {
    const { getByText } = render(<PropertyListPage />);
    const headingElement = getByText('Properties List');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders property list items correctly', () => {
    const { getAllByTestId } = render(<PropertyListPage />);
    const propertyListItems = getAllByTestId('property-component');
    if (properties.length > 4) {
      expect(propertyListItems.length).toBe(4);
    } else {
      expect(propertyListItems.length).toBe(properties.length);
    }
  });
});
