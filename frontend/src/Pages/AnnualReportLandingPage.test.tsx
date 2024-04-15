// AnnualReportLandingPage.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnnualReportLandingPage from './AnnualReportLandingPage';

describe('AnnualReportLandingPage Component', () => {
  test('renders page title', () => {
    render(<AnnualReportLandingPage />);
    expect(screen.getByText(/Annual Report 2024/i)).toBeInTheDocument();
  });

});
