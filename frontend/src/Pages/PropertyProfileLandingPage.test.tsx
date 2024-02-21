import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import PropertyProfileLandingPage from './PropertyProfileLandingPage';
import '@testing-library/jest-dom';

describe('PropertyProfileLandingPage', () => {
  test("renders with initial property info", () => {
    render(
        <Router>
          <PropertyProfileLandingPage />
        </Router>
      );
    expect(screen.getByText("Windcreek Villa Profile")).toBeInTheDocument();
    expect(screen.getByText("123 Main Street, Cityville")).toBeInTheDocument();
  });

  test("updates info on form save", async () => {
    render(
        <Router>
          <PropertyProfileLandingPage />
        </Router>
      );
    // Make sure to render the component before trying to interact with it

    // Assuming you have an Edit button in your form
    await userEvent.click(screen.getByText("Edit"));

    // Assuming "address" field can be edited
    const addressInput = await screen.findByDisplayValue("123 Main Street, Cityville");
    await userEvent.clear(addressInput);
    await userEvent.type(addressInput, "456 Elm Street, Townsville");

    await userEvent.click(screen.getByText("Save Changes"));

    // This step assumes the component re-renders and displays the updated info
    // Make sure your component's state and rendering logic actually reflects the change
    expect(await screen.findByText("456 Elm Street, Townsville")).toBeInTheDocument();
  });
  test('displays property info and condo list', () => {
    render(
      <Router>
        <PropertyProfileLandingPage />
      </Router>
    );

    // Check if the property info section is rendered with correct title
    expect(screen.getByText('Windcreek Villa Profile')).toBeInTheDocument();

    // Check if the condo list section is rendered with correct title
    expect(screen.getByText('Condo List')).toBeInTheDocument();

    // Check if the "Add Unit" button is rendered and clickable
    const addUnitButton = screen.getByRole('button', { name: /add unit/i });
    expect(addUnitButton).toBeInTheDocument();
    userEvent.click(addUnitButton);
    // Add more assertions based on what the "Add Unit" button does

    // Check if each condo in the list is rendered
    const condos = screen.getAllByTestId('condo-component');
    expect(condos.length).toBeGreaterThan(0); // Check if there are condos rendered
    condos.forEach((condo) => {
      expect(condo).toBeInTheDocument();
    });
  });
});
