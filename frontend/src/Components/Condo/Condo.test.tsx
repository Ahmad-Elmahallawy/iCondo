import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import CondoComponent from './Condo';
import { MemoryRouter } from 'react-router-dom'; 

describe('CondoComponent', () => {
  const condo = {
    condoId: 1,
    condoFee: '500',
    imageUrl: 'Assets/condo1.svg',
  };

  test('renders condo component with correct condo id, occupant name, and condo fee', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter> {/* Wrap CondoComponent with MemoryRouter */}
        <CondoComponent condo={condo} />
      </MemoryRouter>
    );
    const condoItem = getByTestId('condo-component');
    const condoIdElement = getByText(`Condo ${condo.condoId}`);
    const condoFeeElement = getByText(`Condo Fee: ${condo.condoFee}`);

    expect(condoItem).toBeInTheDocument();
    expect(condoIdElement).toBeInTheDocument();
    expect(condoFeeElement).toBeInTheDocument();
  });

  test('renders condo image with correct alt text', () => {
    const { getByAltText } = render(
      <MemoryRouter> {/* Wrap CondoComponent with MemoryRouter */}
        <CondoComponent condo={condo} />
      </MemoryRouter>
    );
    const condoImage = getByAltText(`Condo`);

    expect(condoImage).toBeInTheDocument();
    expect(condoImage.getAttribute('src')).toBe("/Assets/condo1.svg");
  });
});
