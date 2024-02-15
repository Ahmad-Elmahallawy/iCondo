// Property.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import PropertyComponent from './Property';

test('renders property information correctly', () => {
  const property = {
    id: 1,
    title: 'Windcreek Villa',
    address: '123 Main Street, Cityville',
    rep: 'Abby Lee',
    image_url: 'Assets/property1.png'
  };

  const { getByAltText, getByText } = render(<PropertyComponent property={property} />);

  expect(getByText(property.title)).toBeInTheDocument();
  expect(getByText(property.address)).toBeInTheDocument();
  expect(getByText(`Title Representative: ${property.rep}`)).toBeInTheDocument();
});