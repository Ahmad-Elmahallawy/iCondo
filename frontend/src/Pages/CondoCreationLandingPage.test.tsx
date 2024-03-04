import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import '@testing-library/jest-dom/extend-expect';
import CondoCreationLandingPage from './CondoCreationLandingPage';

describe('CondoCreationLandingPage component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter> 
        <CondoCreationLandingPage />
      </MemoryRouter>
    );
  });

  it('renders CondoCreation component', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CondoCreationLandingPage />
      </MemoryRouter>
    );
    expect(getByText('Create Condo Unit')).toBeInTheDocument();
  });
});
