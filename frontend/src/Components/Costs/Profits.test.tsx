// Profits.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profits from './Profits';

describe('Profits Component', () => {
  test('renders and displays loading state', () => {
    render(<Profits totalRevenues={null} totalExpenses={null} />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

});
