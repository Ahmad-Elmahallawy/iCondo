import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateProperty from './CreateProperty';

jest.mock('axios');

describe('CreateProperty component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <CreateProperty />
      </MemoryRouter>
    );
    expect(screen.getByTestId('create-property-component')).toBeInTheDocument();
  });

  it('does not submit form when there are form errors', async () => {
    // Mock companyData with appropriate initial values
    const mockCompanyData = {
      company: {
        id: '16',
      },
    };

    // Set mock companyDetails in localStorage
    localStorage.setItem('companyDetails', JSON.stringify([mockCompanyData]));

    render(
      <MemoryRouter>
        <CreateProperty />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole('button', { name: 'Create Property' }));

    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled();
      expect(screen.getByTestId('create-property-component')).toBeInTheDocument();
    });
  });
});
describe('CreateProperty component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <CreateProperty />
      </MemoryRouter>
    );
    expect(screen.getByTestId('create-property-component')).toBeInTheDocument();
  });

  it('does not submit form when there are form errors', async () => {
    // Mock companyData with appropriate initial values
    const mockCompanyData = {
      company: {
        id: '16',
      },
    };

    // Set mock companyDetails in localStorage
    localStorage.setItem('companyDetails', JSON.stringify([mockCompanyData]));

    render(
      <MemoryRouter>
        <CreateProperty />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole('button', { name: 'Create Property' }));

    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled();
      expect(screen.getByTestId('create-property-component')).toBeInTheDocument();
    });
  });

  describe('CreateProperty component', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('submits form with valid data', async () => {
      const mockCompanyData = {
        company: {
          id: '16',
        },
      };
      localStorage.setItem('companyDetails', JSON.stringify([mockCompanyData]));
  
      // Mock token value in localStorage
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM1LCJ1c2VybmFtZSI6ImNvbXBhbnlCIiwiaWF0IjoxNzA5MDE3MTg2LCJleHAiOjE3MDkxODk5ODZ9.3P-TnDwReL6aUywtKhAwIDDJWHBcutUA5UAFyG9leb4';
      localStorage.setItem('userData', JSON.stringify({ accessToken: mockToken }));
  
      render(
        <MemoryRouter>
          <CreateProperty />
        </MemoryRouter>
      );
  
      // Fill form with valid data
      fireEvent.change(screen.getByPlaceholderText('Property Name'), { target: { value: 'Test Property' } });
      fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Test St' } });
      fireEvent.change(screen.getByPlaceholderText('Unit Count'), { target: { value: '10' } });
      fireEvent.change(screen.getByPlaceholderText('Parking Count'), { target: { value: '5' } });
      fireEvent.change(screen.getByPlaceholderText('Locker Count'), { target: { value: '3' } });
  
      // Submit form
      fireEvent.submit(screen.getByRole('button', { name: 'Create Property' }));
  
      // Assert that axios.post is called with correct data
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
          'http://localhost:8000/api/properties',
          {
            address: '123 Test St',
            lockerCount: 3,
            name: 'Test Property',
            parkingCount: 5,
            unitCount: 10,
            company: { id: '16' },
          },
          {
            headers: {
              Authorization: `Bearer ${mockToken}`, // Expecting the correct token value
              'Content-Type': 'application/json',
            },
          }
        );
      });
    });
  });

  it('submits form with valid data including files', async () => {
    const mockCompanyData = {
      company: {
        id: '16',
      },
    };
    localStorage.setItem('companyDetails', JSON.stringify([mockCompanyData]));
  
    // Mock token value in localStorage
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM1LCJ1c2VybmFtZSI6ImNvbXBhbnlCIiwiaWF0IjoxNzA5MDE3MTg2LCJleHAiOjE3MDkxODk5ODZ9.3P-TnDwReL6aUywtKhAwIDDJWHBcutUA5UAFyG9leb4';
    localStorage.setItem('userData', JSON.stringify({ accessToken: mockToken }));
  
    render(
      <MemoryRouter>
        <CreateProperty />
      </MemoryRouter>
    );
  
    // Fill form with valid data
    fireEvent.change(screen.getByPlaceholderText('Property Name'), { target: { value: 'Test Property' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Test St' } });
    fireEvent.change(screen.getByPlaceholderText('Unit Count'), { target: { value: '10' } });
    fireEvent.change(screen.getByPlaceholderText('Parking Count'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Locker Count'), { target: { value: '3' } });
  
    // Simulate file upload
    const file = new File(['test-file-content'], 'test-file.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
  
  

  
    // Test file deletion
    fireEvent.click(screen.getByTestId('delete-file-button'));
  
    // Assert that the file is removed from the UI
    expect(screen.queryByText('test-file.png')).toBeNull();
  })
});

