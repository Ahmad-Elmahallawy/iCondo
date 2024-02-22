import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateProperty from './CreateProperty';

describe('CreateProperty component', () => {
  it('renders without crashing', () => {
    render(<CreateProperty />);
    expect(screen.getByTestId('create-property-component')).toBeInTheDocument();
  });


  it('submits form with valid data', async () => {
    // Spy on console.log
    const spy = jest.spyOn(console, 'log');

    render(<CreateProperty />);
    const propertyNameInput = screen.getByPlaceholderText('Property Name');
    const addressInput = screen.getByPlaceholderText('Address');
    const unitCountInput = screen.getByPlaceholderText('Unit Count');
    const parkingCountInput = screen.getByPlaceholderText('Parking Count');
    const lockerCountInput = screen.getByPlaceholderText('Locker Count');

    fireEvent.change(propertyNameInput, { target: { value: 'Test Property' } });
    fireEvent.change(addressInput, { target: { value: '123 Test St' } });
    fireEvent.change(unitCountInput, { target: { value: '10' } });
    fireEvent.change(parkingCountInput, { target: { value: '5' } });
    fireEvent.change(lockerCountInput, { target: { value: '3' } });

    fireEvent.change(screen.getByLabelText('Upload File'), {
      target: {
        files: [new File([''], 'test.jpg', { type: 'image/jpeg' })],
      },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'Create Property' }));

    // Ensure onSubmit function is called
    await waitFor(() => {
      // Assert console.log calls with expected arguments
      expect(spy).toHaveBeenCalledWith({
        propertyName: 'Test Property',
        address: '123 Test St',
        unitCount: '10',
        parkingCount: '5',
        lockerCount: '3',
      });
    });

    // Restore the original console.log
    spy.mockRestore();
  });


  it('disables submit button when there are form errors', async () => {
    render(<CreateProperty />);

    fireEvent.change(screen.getByPlaceholderText('Property Name'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Unit Count'), { target: { value: 'abc' } });
    fireEvent.change(screen.getByPlaceholderText('Parking Count'), { target: { value: 'def' } });
    fireEvent.change(screen.getByPlaceholderText('Locker Count'), { target: { value: 'xyz' } });

    await waitFor(() => {
      expect(screen.getByTestId('submit-button')).toBeDisabled();
    });
  });


  it('handles file change correctly', () => {
    render(<CreateProperty />);
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files?.[0]).toEqual(file);
  });


  it('does not submit form when there are form errors', async () => {
    const spy = jest.spyOn(console, 'log');
    render(<CreateProperty />);

    fireEvent.change(screen.getByPlaceholderText('Property Name'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Unit Count'), { target: { value: 'abc' } });
    fireEvent.change(screen.getByPlaceholderText('Parking Count'), { target: { value: 'def' } });
    fireEvent.change(screen.getByPlaceholderText('Locker Count'), { target: { value: 'xyz' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Create Property' }));

    await waitFor(() => {
      expect(spy).not.toHaveBeenCalled();
    });

    spy.mockRestore();
  });

  it('submits form with valid data', async () => {
    const spy = jest.spyOn(console, 'log');

    render(<CreateProperty />);
    const propertyNameInput = screen.getByPlaceholderText('Property Name');
    const addressInput = screen.getByPlaceholderText('Address');
    const unitCountInput = screen.getByPlaceholderText('Unit Count');
    const parkingCountInput = screen.getByPlaceholderText('Parking Count');
    const lockerCountInput = screen.getByPlaceholderText('Locker Count');

    fireEvent.change(propertyNameInput, { target: { value: 'Test Property' } });
    fireEvent.change(addressInput, { target: { value: '123 Test St' } });
    fireEvent.change(unitCountInput, { target: { value: '10' } });
    fireEvent.change(parkingCountInput, { target: { value: '5' } });
    fireEvent.change(lockerCountInput, { target: { value: '3' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Create Property' }));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith({
        propertyName: 'Test Property',
        address: '123 Test St',
        unitCount: '10',
        parkingCount: '5',
        lockerCount: '3',
      });
    });

    spy.mockRestore();
  });

  it("displays error message for unitCount input field when it is empty", async () => {
    render(<CreateProperty />);
    fireEvent.change(screen.getByPlaceholderText("Unit Count"), {
      target: { value: "test this" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create property/i }));

    await waitFor(() => {
      const errorElement = screen.getByText("Unit Count must be a number", {
        selector: "p.error-msg",
      });
      expect(errorElement).toBeInTheDocument();
    });
  });

  it("displays error message for ParkingCount input field when it is empty", async () => {
    render(<CreateProperty />);
    fireEvent.change(screen.getByPlaceholderText("Parking Count"), {
      target: { value: "test this" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create property/i }));

    await waitFor(() => {
      const errorElement = screen.getByText("Parking Count must be a number", {
        selector: "p.error-msg",
      });
      expect(errorElement).toBeInTheDocument();
    });
  });

  it("displays error message for lockerCount input field when it is empty", async () => {
    render(<CreateProperty />);
    fireEvent.change(screen.getByPlaceholderText("Locker Count"), {
      target: { value: "test this" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create property/i }));

    await waitFor(() => {
      const errorElement = screen.getByText("Locker Count must be a number", {
        selector: "p.error-msg",
      });
      expect(errorElement).toBeInTheDocument();
    });
  });

});
