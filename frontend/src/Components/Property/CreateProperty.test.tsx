import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateProperty from './CreateProperty';

describe('CreateProperty', () => {
  it('renders without crashing', () => {
    render(<CreateProperty />);
  });

  it('submits form with correct values', async () => {
    const { getByPlaceholderText, getByLabelText, getByTestId } = render(
      <CreateProperty />
    );

    // Fill out the form
    fireEvent.change(getByPlaceholderText('Property Name'), {
      target: { value: 'Test Property' },
    });
    fireEvent.change(getByPlaceholderText('Address'), {
      target: { value: '123 Test St' },
    });
    fireEvent.change(getByPlaceholderText('Unit Count'), {
      target: { value: '10' },
    });
    fireEvent.change(getByPlaceholderText('Parking Count'), {
      target: { value: '5' },
    });
    fireEvent.change(getByPlaceholderText('Locker Count'), {
      target: { value: '2' },
    });

    // Attach a file
    const fileInput = getByLabelText('Upload File');
    const file = new File(['dummy content'], 'test.jpg', {
      type: 'image/jpeg',
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log');

    // Submit the form
    fireEvent.click(getByTestId('submit-button'));

    // Check if form is submitted with correct values
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({
        propertyName: 'Test Property',
        address: '123 Test St',
        unitCount: '10',
        parkingCount: '5',
        lockerCount: '2',
      });
      expect(consoleSpy).toHaveBeenCalledWith(file);
    });

    consoleSpy.mockRestore();
  });

});
