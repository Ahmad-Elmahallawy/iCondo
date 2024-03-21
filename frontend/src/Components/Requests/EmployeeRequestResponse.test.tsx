import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmployeeRequestResponse from './EmployeeRequestResponse';

test('renders request ID and current status', () => {
  const requestId = '123';
  const currentStatus = 'In Progress';
  const onSubmit = jest.fn();

  const { getByText, getByRole } = render(
    <EmployeeRequestResponse
      requestId={requestId}
      currentStatus={currentStatus}
      onSubmit={onSubmit}
    />
  );

  const requestIDElement = getByText(`Request ID: ${requestId}`);
  const currentStatusElement = getByText(`Current Status: ${currentStatus}`);
  const inProgressButton = getByRole('button', { name: /In Progress/i });
  const completeButton = getByRole('button', { name: /Complete/i });

  expect(requestIDElement).toBeInTheDocument();
  expect(currentStatusElement).toBeInTheDocument();

  fireEvent.click(inProgressButton);
  expect(onSubmit).toHaveBeenCalledWith('In Progress', requestId);

  fireEvent.click(completeButton);
  expect(onSubmit).toHaveBeenCalledWith('Complete', requestId);
});
