// SelectSubjectRequest.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import SelectSubjectRequest from './SelectSubjectRequest';

describe('SelectSubjectRequest', () => {
 it('calls onSelect with the selected value when a menu item is clicked', async () => {
    const mockOnSelect = jest.fn();
    render(<SelectSubjectRequest onSelect={mockOnSelect} />);

    const select = screen.getByLabelText('Request');
    userEvent.click(select); // Open the dropdown

    const option = await screen.findByText('Moving In'); // Find the option by its text
    userEvent.click(option); // Click the option

    expect(mockOnSelect).toHaveBeenCalledWith('moving_in');
 });
});
