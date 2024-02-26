import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateProperty from './CreateProperty';
import { within } from '@testing-library/dom';


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
        files: [],
        unitCount: '10',
        parkingCount: '5',
        lockerCount: '3',
      });
    });

    // Restore the original console.log
    spy.mockRestore();
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
  
    // Submit the form with invalid data
    fireEvent.submit(screen.getByRole('button', { name: 'Create Property' }));
  
    // Wait for any asynchronous tasks to complete
    await waitFor(() => {
      // Expect that console.log is not called
      expect(spy).not.toHaveBeenCalled();
      // Expect that onSubmit handler is not called
      expect(screen.queryByTestId('create-property-component')).toBeInTheDocument();
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
        files: [],
        unitCount: '10',
        parkingCount: '5',
        lockerCount: '3',
      });
    });

    spy.mockRestore();
  });

  it("displays error message for unitCount input field when it is not a number", async () => {
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

  it("displays error message for ParkingCount input field when it is not a number", async () => {
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

  it("displays error message for lockerCount input field when it is not a number", async () => {
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

  it("displays error message for lockerCount input field when it is empty", async () => {
    render(<CreateProperty />);
    
    // Click the submit button without entering anything in the lockerCount input field
    fireEvent.click(screen.getByRole("button", { name: /create property/i }));
  
    // Wait for the error message to be displayed for the lockerCount input field
    await waitFor(() => {
      const lockerCountContainer = screen.getByPlaceholderText("Locker Count").closest(".create-property-input") as HTMLElement;
      const errorElement = within(lockerCountContainer).getByText("Required");
      expect(errorElement).toBeInTheDocument();
    });
  });
  
  it("displays error message for propertyName input field when it is empty", async () => {
    render(<CreateProperty />);
    
    // Click the submit button without entering anything in the lockerCount input field
    fireEvent.click(screen.getByRole("button", { name: /create property/i }));
  
    // Wait for the error message to be displayed for the lockerCount input field
    await waitFor(() => {
      const lockerCountContainer = screen.getByPlaceholderText("Property Name").closest(".create-property-input") as HTMLElement;
      const errorElement = within(lockerCountContainer).getByText("Required");
      expect(errorElement).toBeInTheDocument();
    });
  });

  it("displays error message for address input field when it is empty", async () => {
    render(<CreateProperty />);
    
    // Click the submit button without entering anything in the lockerCount input field
    fireEvent.click(screen.getByRole("button", { name: /create property/i }));
  
    // Wait for the error message to be displayed for the lockerCount input field
    await waitFor(() => {
      const lockerCountContainer = screen.getByPlaceholderText("Address").closest(".create-property-input") as HTMLElement;
      const errorElement = within(lockerCountContainer).getByText("Required");
      expect(errorElement).toBeInTheDocument();
    });
  });

  it("displays error message for unitCount input field when it is empty", async () => {
    render(<CreateProperty />);
    
    // Click the submit button without entering anything in the lockerCount input field
    fireEvent.click(screen.getByRole("button", { name: /create property/i }));
  
    // Wait for the error message to be displayed for the lockerCount input field
    await waitFor(() => {
      const lockerCountContainer = screen.getByPlaceholderText("Unit Count").closest(".create-property-input") as HTMLElement;
      const errorElement = within(lockerCountContainer).getByText("Required");
      expect(errorElement).toBeInTheDocument();
    });
  });

  it("displays error message for parkingCount input field when it is empty", async () => {
    render(<CreateProperty />);
    
    // Click the submit button without entering anything in the lockerCount input field
    fireEvent.click(screen.getByRole("button", { name: /create property/i }));
  
    // Wait for the error message to be displayed for the lockerCount input field
    await waitFor(() => {
      const lockerCountContainer = screen.getByPlaceholderText("Parking Count").closest(".create-property-input") as HTMLElement;
      const errorElement = within(lockerCountContainer).getByText("Required");
      expect(errorElement).toBeInTheDocument();
    });
  });

  it('adds selected files when file input changes', () => {
    render(<CreateProperty />);
    const file1 = new File([''], 'test1.jpg', { type: 'image/jpeg' });
    const file2 = new File([''], 'test2.jpg', { type: 'image/jpeg' });
  
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file1, file2] } });
  
    expect(fileInput.files?.length).toBe(2);
    expect(fileInput.files?.[0]).toEqual(file1);
    expect(fileInput.files?.[1]).toEqual(file2);
  });
  
  it('displays selected files when files are added', () => {
    render(<CreateProperty />);
    const file1 = new File([''], 'test1.jpg', { type: 'image/jpeg' });
    const file2 = new File([''], 'test2.jpg', { type: 'image/jpeg' });
  
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file1, file2] } });
  
    expect(screen.getByText('test1.jpg')).toBeInTheDocument();
    expect(screen.getByText('test2.jpg')).toBeInTheDocument();
  });
  
  it('removes selected file when delete button is clicked', () => {
    render(<CreateProperty />);
    const file1 = new File([''], 'test1.jpg', { type: 'image/jpeg' });
    const file2 = new File([''], 'test2.jpg', { type: 'image/jpeg' });
  
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file1, file2] } });
  
    const deleteButton = screen.getAllByAltText('Delete')[0];
    fireEvent.click(deleteButton);
  
    expect(screen.queryByText('test1.jpg')).not.toBeInTheDocument();
  });
  
  it('adds selected files when files are dropped', () => {
    render(<CreateProperty />);
    const file1 = new File([''], 'test1.jpg', { type: 'image/jpeg' });
    const file2 = new File([''], 'test2.jpg', { type: 'image/jpeg' });
  
    const dropArea = screen.getByTestId('create-property-file');
    fireEvent.drop(dropArea, { dataTransfer: { files: [file1, file2] } });
  
    expect(screen.getByText('test1.jpg')).toBeInTheDocument();
    expect(screen.getByText('test2.jpg')).toBeInTheDocument();
  });
    
  it('does not submit form when unitCount input field contains non-numeric value', async () => {
    const spy = jest.spyOn(console, 'log');
  
    render(<CreateProperty />);
    
    fireEvent.change(screen.getByPlaceholderText('Unit Count'), { target: { value: 'non-numeric' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Create Property' }));
  
    await waitFor(() => {
      expect(spy).not.toHaveBeenCalled();
    });
  
    spy.mockRestore();
  });
  
  it('does not submit form when parkingCount input field contains non-numeric value', async () => {
    const spy = jest.spyOn(console, 'log');
  
    render(<CreateProperty />);
    
    fireEvent.change(screen.getByPlaceholderText('Parking Count'), { target: { value: 'non-numeric' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Create Property' }));
  
    await waitFor(() => {
      expect(spy).not.toHaveBeenCalled();
    });
  
    spy.mockRestore();
  });
  
  it('does not submit form when lockerCount input field contains non-numeric value', async () => {
    const spy = jest.spyOn(console, 'log');
  
    render(<CreateProperty />);
    
    fireEvent.change(screen.getByPlaceholderText('Locker Count'), { target: { value: 'non-numeric' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Create Property' }));
  
    await waitFor(() => {
      expect(spy).not.toHaveBeenCalled();
    });
  
    spy.mockRestore();
  });
  
  
  it('does not submit form when lockerCount input field contains non-numeric value', async () => {
    // Spy on console.log
    const spy = jest.spyOn(console, 'log');
  
    render(<CreateProperty />);
  
    // Change lockerCount to a non-numeric value
    fireEvent.change(screen.getByPlaceholderText('Locker Count'), { target: { value: 'non-numeric' } });
  
    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: 'Create Property' }));
  
    // Ensure onSubmit function is not called
    await waitFor(() => {
      expect(spy).not.toHaveBeenCalled();
    });
  
    // Restore the original console.log
    spy.mockRestore();
  });

  
  it('handles input change correctly', () => {
    // Arrange
    render(<CreateProperty />);
    const propertyNameInput = screen.getByPlaceholderText('Property Name') as HTMLInputElement;

    // Act
    fireEvent.change(propertyNameInput, { target: { value: 'Test Property' } });

    // Assert
    expect(propertyNameInput.value).toBe('Test Property');
  });

  it('prevents default action on dragover event', () => {
    // Arrange
    const { getByTestId } = render(<CreateProperty />);
    const fileDropArea = getByTestId('create-property-file');

    // Act
    fireEvent.dragOver(fileDropArea);

    // Assert
    expect(fileDropArea).toHaveStyle('border-color: #3c3633'); // Matching border-color from CSS
  });

  it('prevents default action and stops propagation on dragenter event', () => {
    // Arrange
    const { getByTestId } = render(<CreateProperty />);
    const fileDropArea = getByTestId('create-property-file');

    // Act
    fireEvent.dragEnter(fileDropArea);

    // Assert
    expect(fileDropArea).toHaveStyle('background-color: #f0f0f0'); // Matching background-color from CSS
  });

  it('prevents default action on dragleave event', () => {
    // Arrange
    const { getByTestId } = render(<CreateProperty />);
    const fileDropArea = getByTestId('create-property-file');

    // Act
    fireEvent.dragLeave(fileDropArea);

    // Assert
    expect(fileDropArea).toHaveStyle('background-color: transparent'); // Matching background-color from CSS
  });
});
