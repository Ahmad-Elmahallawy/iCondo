import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmployeeListLandingPage from './EmployeeListLandingPage';
import * as api from '../api';

jest.mock('../api');

const mockEmployees = [
  { user: { id: '1' } },
  { user: { id: '2' } },
];

const mockUserInfo = [
  { data: { id: 1, firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890', username: 'johndoe', roles: ['employee'], email: 'john.doe@example.com' } },
  { data: { id: 2, firstName: 'Jane', lastName: 'Smith', phoneNumber: '9876543210', username: 'janesmith', roles: ['manager'], email: 'jane.smith@example.com' } },
];

describe('EmployeeListLandingPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', async () => {
    render(<EmployeeListLandingPage />);

    // Wait for loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  test('renders "No Employees" message when there are no employees', async () => {
    // Mocking the implementation of the getCompanyEmployees function to return empty array
    api.default.employeeRegistration.getCompanyEmployees = jest.fn().mockResolvedValue([]);

    render(<EmployeeListLandingPage />);

    // Wait for loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Verify "No Employees" message
    expect(screen.getByText('No Employees')).toBeInTheDocument();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });


});
