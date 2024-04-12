// RevenuesList.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RevenuesList from './RevenuesList';
import api from '../../api';

// Mock the entire api module
jest.mock('../../api', () => ({
  properties: {
    getAllProperties: jest.fn()
  }
}));

const setTotalRevenuesMock = jest.fn();

// Mock data to be returned by the api call
const mockPropertyData = [
  { id: 1, name: 'Property 1' },
  { id: 2, name: 'Property 2' },
];

const mockCondoData = [
  { id: 1, condoFee: 300 },
  { id: 2, condoFee: 400 },
];

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  setTotalRevenuesMock.mockClear();
  api.properties.getAllProperties = jest.fn().mockResolvedValue({
    data: mockPropertyData
  });
});

describe('RevenuesList Component', () => {
  test('renders and displays loading state', async () => {
    render(<RevenuesList setTotalRevenues={setTotalRevenuesMock} />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

});
