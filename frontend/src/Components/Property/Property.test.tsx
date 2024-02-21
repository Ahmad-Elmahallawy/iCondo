// Property.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import PropertyComponent from './Property';

describe('PropertyComponent', () => {
  const property = {
    id: 1,
    title: 'Windcreek Villa',
    address: '123 Main Street, Cityville',
    image_url: 'Assets/property1.png',
  };

  test('renders property component with correct title and address', () => {
    const { getByTestId, getByText } = render(
      <PropertyComponent property={property} />
    );
    const propertyItem = getByTestId('property-component');
    const titleElement = getByText(property.title);
    const addressElement = getByText(property.address);

    expect(propertyItem).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(addressElement).toBeInTheDocument();
  });

  test('renders property image with correct alt text', () => {
    const { getByAltText } = render(<PropertyComponent property={property} />);
    const propertyImage = getByAltText(property.title);

    expect(propertyImage).toBeInTheDocument();
    expect(propertyImage.getAttribute('src')).toBe(property.image_url);
  });
});