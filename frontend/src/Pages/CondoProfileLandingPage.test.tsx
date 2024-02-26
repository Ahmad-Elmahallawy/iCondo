import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CondoProfileLandingPage from "./CondoProfileLandingPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe("CondoProfileLandingPage", () => {
  test("renders with initial condo info", async () => {
    // Render the component within a MemoryRouter to mimic the app's routing context
    render(
      <MemoryRouter>
        <CondoProfileLandingPage />
      </MemoryRouter>
    );

    // Check that the page title or a unique element is rendered
    expect(screen.getByText("Condo Profile")).toBeInTheDocument();

    // Use waitFor for elements that might depend on asynchronous operations like data fetching
    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
  });

  test("updates info on form save", async () => {
    // Render the component, same as the first test
    render(
      <MemoryRouter>
        <CondoProfileLandingPage />
      </MemoryRouter>
    );

    // Simulate user actions with userEvent, here clicking an "Edit" button to enter edit mode
    await userEvent.click(screen.getByText("Edit"));

    // Find the input by its initial value, then clear it and type a new value
    const occupantNameInput = await screen.findByDisplayValue(/John Doe/i);

    await userEvent.clear(occupantNameInput);
    await userEvent.type(occupantNameInput, "Jane Doe");

    // Click the "Save Changes" button to submit the form
    await userEvent.click(screen.getByText("Save Changes"));

    // Use waitFor to handle assertions on asynchronous updates, ensuring the new value is displayed
    await waitFor(() => {
      expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    });
  });
});
