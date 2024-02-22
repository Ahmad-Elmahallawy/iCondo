import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import CondoComponent from './Condo';

describe('CondoComponent', () => {
  const condo = {
    condoId: 1,
    occupantName: 'John Doe',
    condoFee: '500',
    imageUrl: 'Assets/condo1.png',
  };

  test('renders condo component with correct condo id, occupant name, and condo fee', () => {
    const { getByTestId, getByText } = render(<CondoComponent condo={condo} />);
    const condoItem = getByTestId('condo-component');
    const condoIdElement = getByText(`Condo ${condo.condoId}`);
    const occupantNameElement = getByText(`Occupant: ${condo.occupantName}`);
    const condoFeeElement = getByText(`Condo Fee: ${condo.condoFee}`);

    expect(condoItem).toBeInTheDocument();
    expect(condoIdElement).toBeInTheDocument();
    expect(occupantNameElement).toBeInTheDocument();
    expect(condoFeeElement).toBeInTheDocument();
  });

  test('renders condo image with correct alt text', () => {
    const { getByAltText } = render(<CondoComponent condo={condo} />);
    const condoImage = getByAltText(`Condo ${condo.condoId}`);

    expect(condoImage).toBeInTheDocument();
    expect(condoImage.getAttribute('src')).toBe(condo.imageUrl);
  });
});
