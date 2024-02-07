import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the Jest DOM library extension
import LogoutConfirmationModal from './LogOut';

describe('LogoutConfirmationModal', () => {
  it('renders without errors', () => {
    render(
      <LogoutConfirmationModal
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    // Assert that the component renders without errors
    expect(screen.getByText('Logout Confirmation')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to log out?')).toBeInTheDocument();
  });

  it('calls onCancel and onConfirm when respective buttons are clicked', () => {
    const onCancelMock = jest.fn();
    const onConfirmMock = jest.fn();

    render(
      <LogoutConfirmationModal
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
      />
    );

    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));
    // Assert that onCancelMock is called
    expect(onCancelMock).toHaveBeenCalled();

    // Click the Log Out button
    fireEvent.click(screen.getByText('Log Out'));
    // Assert that onConfirmMock is called
    expect(onConfirmMock).toHaveBeenCalled();
  });
});
