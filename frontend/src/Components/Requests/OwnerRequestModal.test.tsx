// OwnerRequestModal.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OwnerRequestModal from './OwnerRequestModal';

describe('OwnerRequestModal', () => {
 const mockOnClose = jest.fn();
 const mockOnSubmit = jest.fn();

 it('renders the modal and calls onClose when close button is clicked', () => {
    render(<OwnerRequestModal open={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />);

    const closeButton = screen.getByLabelText('delete');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
 });

 it('renders the modal and calls onSubmit when submit button is clicked', () => {
    render(<OwnerRequestModal open={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
 });
});
