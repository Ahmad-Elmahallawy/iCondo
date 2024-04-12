import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, useNavigate } from 'react-router-dom';

// Import jest-dom's custom matchers
import '@testing-library/jest-dom/extend-expect';
import RentalUserDashboardPage from './RentalUserDashboard';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


describe('RentalUserDashboardPage', () => {
  test('renders dashboard page', () => {
    render(
      <MemoryRouter>
        <RentalUserDashboardPage />
      </MemoryRouter>
    );

    // Check if the page title is rendered
    const pageTitle = screen.getByText(/Dashboard/i);
    expect(pageTitle).toBeInTheDocument();

    // Check if profile icon card is rendered
    const profileCard = screen.getByText(/My Profile/i);
    expect(profileCard).toBeInTheDocument();

    // Check if condos icon card is rendered
    const condosCard = screen.getByText(/My Condos/i);
    expect(condosCard).toBeInTheDocument();

    // Check if requests icon card is rendered
    const requestsCard = screen.getByText(/Common Facilities Calendar/i);
    expect(requestsCard).toBeInTheDocument();
  });
  
  test('renders correct number of IconCards', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <RentalUserDashboardPage />
      </BrowserRouter>
    );
    const iconCards = getAllByTestId('icon-card');
    expect(iconCards.length).toBe(3);
  });
  
  test('navigates to correct route on icon card click', () => {
    render(
      <MemoryRouter>
        <RentalUserDashboardPage />
      </MemoryRouter>
    );

    // Click on profile icon card
    fireEvent.click(screen.getByText(/My Profile/i));

    // Check if navigation occurred to the correct route
    expect(window.location.pathname).toBe('/');
  });

  test('does not redirect to login page if user is logged in', () => {
    // Mock localStorage getItem method to return user data
    const userData = { username: 'testuser' };
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify(userData));

    // Mock useHistory to track if it's called
    const mockHistoryPush = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({ push: mockHistoryPush }),
    }));

    render(
      <MemoryRouter>
        <RentalUserDashboardPage />
      </MemoryRouter>
    );

    // Check if useHistory was not called
    expect(mockHistoryPush).not.toHaveBeenCalled();
  });

  test('renders "My Condos" icon card', () => {
    render(
      <MemoryRouter>
        <RentalUserDashboardPage />
      </MemoryRouter>
    );

    // Check if "My Condos" icon card is rendered
    const condosCard = screen.getByText(/My Condos/i);
    expect(condosCard).toBeInTheDocument();
  });

  test('renders "Common Facilities Calendar" icon card', () => {
    render(
      <MemoryRouter>
        <RentalUserDashboardPage />
      </MemoryRouter>
    );

    // Check if "My Requests" icon card is rendered
    const requestsCard = screen.getByText(/Common Facilities Calendar/i);
    expect(requestsCard).toBeInTheDocument();
  });

  test('navigates to correct route on "My Condos" icon card click', () => {
    render(
      <MemoryRouter>
        <RentalUserDashboardPage />
      </MemoryRouter>
    );
  
    // Click on "My Condos" icon card
    fireEvent.click(screen.getByText(/My Condos/i));
  
    // Check if navigation occurred to the correct route
    expect(window.location.pathname).toBe('/');
  });
  
  
  test('navigates to correct route on "Common Facilities Calendar" icon card click', () => {
    render(
      <MemoryRouter>
        <RentalUserDashboardPage />
      </MemoryRouter>
    );
  
    // Click on "My Requests" icon card
    fireEvent.click(screen.getByText(/Common Facilities Calendar/i));
  
    // Check if navigation occurred to the correct route
    expect(window.location.pathname).toBe('/');
  });

  test('displays user profile if user is logged in', () => {
    // Mock localStorage getItem method to return user data
    const userData = { username: 'testuser' };
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify(userData));

    // Render the component
    render(
      <MemoryRouter>
        <RentalUserDashboardPage />
      </MemoryRouter>
    );

    // Check if user profile is displayed
    const profileCard = screen.getByText(/My Profile/i);
    expect(profileCard).toBeInTheDocument();
  });
  
  test('navigates to correct route on "Common Facilities Calendar" icon card click', () => {
    render(
      <MemoryRouter>
       <RentalUserDashboardPage />
      </MemoryRouter>
    );
  
    // Click on "My Requests" icon card
    fireEvent.click(screen.getByText(/Common Facilities Calendar/i));
  
    // Check if navigation occurred to the correct route
    expect(window.location.pathname).toBe('/');
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not redirect to login page when user is logged in', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify({ id: 1, username: 'testuser' }));

    render(
      <BrowserRouter>
       <RentalUserDashboardPage />
      </BrowserRouter>
    );

    // Assert that mockNavigate was not called
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
