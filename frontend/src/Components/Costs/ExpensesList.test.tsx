// ExpensesList.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ExpensesList from './ExpensesList';
import api from '../../api';

// Mock the entire api module
jest.mock('../../api', () => ({
  costs: {
    getCosts: jest.fn()
  }
}));

const setTotalExpensesMock = jest.fn();

// Mock data to be returned by the api call
const mockCostData = [
  { costName: 'Cleaning', amount: '200' },
  { costName: 'Maintenance', amount: '500' },
];

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  setTotalExpensesMock.mockClear();
  api.costs.getCosts = jest.fn().mockResolvedValue({
    data: mockCostData
  });
});

describe('ExpensesList Component', () => {
  test('renders and displays loading state', async () => {
    render(<ExpensesList setTotalExpenses={setTotalExpensesMock} />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('loads and displays the expenses', async () => {
    render(<ExpensesList setTotalExpenses={setTotalExpensesMock} />);

    // Wait for the api call to resolve and the component to update
    await waitFor(() => {
      expect(screen.getByText(/Cleaning/i)).toBeInTheDocument();
      expect(screen.getByText(/Maintenance/i)).toBeInTheDocument();
      expect(screen.getByText('200')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
    });
  });

  test('calculates and sets total expenses correctly', async () => {
    render(<ExpensesList setTotalExpenses={setTotalExpensesMock} />);

    // Wait for the total to be calculated after the component updates with fetched data
    await waitFor(() => {
      expect(setTotalExpensesMock).toHaveBeenCalledWith(700);
    });
  });

  test('handles api error', async () => {
    api.costs.getCosts = jest.fn().mockRejectedValue(new Error('Async error'));

    render(<ExpensesList setTotalExpenses={setTotalExpensesMock} />);

    // Optionally, verify some error state or notification in your UI
    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
      // If your component displays an error message, you can expect it here
      // expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
