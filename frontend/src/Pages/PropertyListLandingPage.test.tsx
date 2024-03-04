import "@testing-library/jest-dom/extend-expect";

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import PropertyListLandingPage from './PropertyListLandingPage';
import { useNavigate } from 'react-router-dom';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockProperties = [
  {
    id: 1,
    name: 'Property 1',
    address: 'Address 1',
    imageUrl: 'image-url-1',
    unitCount: '10',
    parkingSpotCount: '5',
    lockerCount: '2',
  },
  {
    id: 2,
    name: 'Property 2',
    address: 'Address 2',
    imageUrl: 'image-url-2',
    unitCount: '8',
    parkingSpotCount: '3',
    lockerCount: '1',
  },
];

describe('PropertyListLandingPage', () => {
  beforeEach(() => {
    localStorage.setItem('userData', JSON.stringify({ accessToken: 'mockAccessToken' }));
    localStorage.setItem('companyDetails', JSON.stringify([{ company: { id: 123 } }]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('handles property click event', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockProperties });
  
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  
    // Mock the handleSavePropertyInfo function
    const mockHandleSavePropertyInfo = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValueOnce([{}, mockHandleSavePropertyInfo]);
  
    render(
      <MemoryRouter>
        <PropertyListLandingPage />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      const propertyElement = screen.getByText('Property 1');
      expect(propertyElement).toBeInTheDocument();
      propertyElement.click();
      expect(mockNavigate).toHaveBeenCalledWith(
        '/PropertyProfile/Property%201',
        { state: { property: { ...mockProperties[0], imageUrl: undefined } } }
      );
    });
  });

  test('renders loading state initially', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockProperties });

    render(
      <MemoryRouter>
        <PropertyListLandingPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Properties List')).toBeInTheDocument();

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
  });

  test('renders properties list', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockProperties });

    render(
      <MemoryRouter>
        <PropertyListLandingPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Properties List')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Property 1')).toBeInTheDocument();
      expect(screen.getByText('Address 1')).toBeInTheDocument();
      expect(screen.getByText('Property 2')).toBeInTheDocument();
      expect(screen.getByText('Address 2')).toBeInTheDocument();
    });
  });

  test('renders "You Do Not Have Any Property" message when there are no properties', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <PropertyListLandingPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('You Do Not Have Any Property')).toBeInTheDocument();
  });
});

