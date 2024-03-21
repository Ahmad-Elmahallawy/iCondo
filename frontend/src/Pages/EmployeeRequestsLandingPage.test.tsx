import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmployeeRequestsLandingPage from './EmployeeRequestsLandingPage';

test('renders "My Assigned Requests" heading', () => {
  const { getByText } = render(<EmployeeRequestsLandingPage />);
  const headingElement = getByText(/My Assigned Requests/i);
  expect(headingElement).toBeInTheDocument();
});
