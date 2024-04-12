// BudgetReportLandingPage.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import BudgetReportLandingPage from './BudgetReportLandingPage';

jest.mock('axios');

describe('BudgetReportLandingPage Component', () => {
  test('renders page title', () => {
    render(<BudgetReportLandingPage />);
    expect(screen.getByText(/Operational Budget Report/i)).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    render(<BudgetReportLandingPage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

});
