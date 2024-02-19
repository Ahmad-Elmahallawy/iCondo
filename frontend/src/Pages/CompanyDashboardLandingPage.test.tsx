import { render, fireEvent } from '@testing-library/react';
import DashboardPage from './CompanyDashboardLandingPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';


test('renders dashboard page with correct title', () => {
  const { getByText } = render(
    <BrowserRouter>
      <DashboardPage />
    </BrowserRouter>
  );
  const titleElement = getByText(/Dashboard/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders correct number of IconCards', () => {
  const { getAllByTestId } = render(
    <BrowserRouter>
      <DashboardPage />
    </BrowserRouter>
  );
  const iconCards = getAllByTestId('icon-card');
  expect(iconCards.length).toBe(6);
});

test('renders IconCards with correct titles and routes', () => {
  const { getByText } = render(
    <BrowserRouter>
      <DashboardPage />
    </BrowserRouter>
  );
  const registerEmployeeLink = getByText(/Register Employee/i).closest('a');
  expect(registerEmployeeLink).toHaveAttribute('href', '/RegisterEmployee');
});

test('navigates to correct route upon clicking an IconCard', () => {
  const { getByText } = render(
    <BrowserRouter>
      <DashboardPage />
    </BrowserRouter>
  );

  const registerEmployeeElement = getByText(/Register Employee/i);
  expect(registerEmployeeElement).toBeInTheDocument();

  const registerEmployeeLink = registerEmployeeElement.closest('a');
  if (registerEmployeeLink) {
    fireEvent.click(registerEmployeeLink);
    expect(window.location.pathname).toBe('/RegisterEmployee');
  } else {
    // If the link is not found, fail the test with an appropriate message
    fail('Register Employee link not found');
  }
});

test('IconCards render correct icons', () => {
  const { getByAltText } = render(
    <BrowserRouter>
      <DashboardPage />
    </BrowserRouter>
  );

});

test('IconCards render correct titles', () => {
  const { getByText } = render(
    <BrowserRouter>
      <DashboardPage />
    </BrowserRouter>
  );
});
