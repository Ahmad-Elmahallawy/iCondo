import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CondoInfoForm from "./CondoInfoForm";
import { MemoryRouter } from "react-router-dom"; // Necessary for components that use react-router
import "@testing-library/jest-dom";

// Group tests for CondoInfoForm component
describe("CondoInfoForm", () => {
  // Define initial test data for the form
  const initialInfo = {
    netArea: "100",
    condoFee: "890",
    unitNumber: "22",
    occupantName: "Will be done Sprint 3",
    condoId: "1"
  };

  // Test to verify that the form renders correctly with the initial information
  test("renders with initial info", () => {
    // Render the CondoInfoForm component inside a MemoryRouter (necessary for any routing functionality)
    render(
      <MemoryRouter>
        <CondoInfoForm condoInfo={initialInfo} onSave={jest.fn()} />
      </MemoryRouter>
    );

    // Assert that the initial occupant name is displayed in the document
    expect(screen.getByText(initialInfo.occupantName)).toBeInTheDocument();
  });

  // Test to verify that changes can be cancelled after editing
  test("cancel changes after edit", async () => {
    // Mock function to simulate the onSave callback
    const mockOnSave = jest.fn();
    // Render the CondoInfoForm component with initial data and the mock onSave function
    render(
      <MemoryRouter>
        <CondoInfoForm condoInfo={initialInfo} onSave={mockOnSave} />
      </MemoryRouter>
    );

    // Simulate user clicking the edit button to enter edit mode
    await userEvent.click(screen.getByRole("button", { name: /Edit/i }));

    // Simulate changing the occupant's name in the input field
    const condoFeeInput = screen.getByDisplayValue(
      initialInfo.condoFee
    );
    await userEvent.clear(condoFeeInput);
    await userEvent.type(condoFeeInput, "Jane Doe");

    // Simulate user clicking the cancel button to discard changes
    await userEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    // Verify that the original occupant name is displayed again, indicating the edit was cancelled
    expect(screen.getByText(initialInfo.condoFee)).toBeInTheDocument();
    // Ensure the onSave mock function was not called, as changes were cancelled
    expect(mockOnSave).not.toHaveBeenCalled();
  });
});
