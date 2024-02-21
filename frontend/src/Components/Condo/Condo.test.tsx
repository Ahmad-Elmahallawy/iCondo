import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import CondoComponent from './Condo';

describe('CondoComponent', () => {
  const condo = {
    condo_id: 1,
    occupant_name: 'John Doe',
    condo_fee: '$500',
    image_url: 'Assets/condo1.png',
  };

  test('renders condo component with correct condo id, occupant name, and condo fee', () => {
    const { getByTestId, getByText } = render(<CondoComponent condo={condo} />);
    const condoItem = getByTestId('condo-component');
    const condoIdElement = getByText(`Condo ${condo.condo_id}`);
    const occupantNameElement = getByText(`Occupant: ${condo.occupant_name}`);
    const condoFeeElement = getByText(`Condo Fee: ${condo.condo_fee}`);

    expect(condoItem).toBeInTheDocument();
    expect(condoIdElement).toBeInTheDocument();
    expect(occupantNameElement).toBeInTheDocument();
    expect(condoFeeElement).toBeInTheDocument();
  });

  test('renders condo image with correct alt text', () => {
    const { getByAltText } = render(<CondoComponent condo={condo} />);
    const condoImage = getByAltText(`Condo ${condo.condo_id}`);

    expect(condoImage).toBeInTheDocument();
    expect(condoImage.getAttribute('src')).toBe(condo.image_url);
  });
});