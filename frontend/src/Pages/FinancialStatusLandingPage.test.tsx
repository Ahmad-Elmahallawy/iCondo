// FinancialStatusLandingPage.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FinancialStatusLandingPage from './FinancialStatusLandingPage';


describe('FinancialStatusLandingPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders page title', () => {
    render(<FinancialStatusLandingPage />);
    expect(screen.getByText(/Financial Status/i)).toBeInTheDocument();
  });

});
