import React from "react"; // Imports necessary libraries and utilities for testing.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CondoInfoForm from "./CondoInfoForm"; // Imports the component under test.
import { MemoryRouter } from "react-router-dom"; // MemoryRouter is used because the component might be utilizing react-router's features.
import "@testing-library/jest-dom"; // Jest-DOM adds custom jest matchers for asserting on DOM nodes.

// Describes a test suite for CondoInfoForm component.
describe("CondoInfoForm", () => {
  // Sets up some initial data to be used in the tests.
  const initialInfo = {
    condoId: "1",
    netArea: "100",
    occupantName: "John Doe",
    propertyId: "330",
    parkingId: "4537",
    condoFee: "890",
    lockerId: "345",
  };

  // Test to verify that the component correctly renders with initial data.
  test("renders with initial info", () => {
    // Render the component inside a MemoryRouter to handle any routing.
    // Pass the initial data and a mock onSave function as props.
    render(
      <MemoryRouter>
        <CondoInfoForm condoInfo={initialInfo} onSave={jest.fn()} />
      </MemoryRouter>
    );

    // Check if the component correctly displays the initial occupant's name.
    expect(screen.getByText(initialInfo.occupantName)).toBeInTheDocument();
  });

  // Test to verify the cancel functionality works as expected after an edit attempt.
  test("cancel changes after edit", async () => {
    // Mock function for onSave to check if it's called or not.
    const mockOnSave = jest.fn();
    // Render the component with initial data and the mock onSave function.
    render(
      <MemoryRouter>
        <CondoInfoForm condoInfo={initialInfo} onSave={mockOnSave} />
      </MemoryRouter>
    );

    // Simulate user action to enter edit mode.
    await userEvent.click(screen.getByRole("button", { name: /Edit/i }));

    // Simulate user action to change the occupant's name.
    const occupantNameInput = screen.getByDisplayValue(
      initialInfo.occupantName
    );
    await userEvent.clear(occupantNameInput);
    await userEvent.type(occupantNameInput, "Jane Doe");

    // Simulate user action to cancel the edit.
    await userEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    // Verify that the initial information is displayed again, indicating the edit was canceled.
    // This ensures that the mockOnSave function was not called, preserving the original data.
    expect(screen.getByText(initialInfo.occupantName)).toBeInTheDocument();
    expect(mockOnSave).not.toHaveBeenCalled();
  });
});
