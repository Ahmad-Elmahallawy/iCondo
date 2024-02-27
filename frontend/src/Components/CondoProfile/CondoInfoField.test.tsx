import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CondoInfoField from "./CondoInfoField";
import "@testing-library/jest-dom";

// Describe block defines a test suite for the CondoInfoField component
describe("CondoInfoField", () => {
  // First test case to verify the component correctly displays values in read-only mode
  test("displays value in read mode", () => {
    // Render the component with props indicating it should be in read-only mode
    render(
      <CondoInfoField
        label="Label"
        value="Value"
        isEditMode={false}
        onChange={() => {}}
        name="field"
      />
    );
    // Assert that the label and value are correctly rendered in the document
    expect(screen.getByText("Label:")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
  });

  // Second test case to verify the component correctly displays an input field in edit mode
  test("displays input in edit mode", () => {
    // Mock function to simulate the onChange handler
    const mockOnChange = jest.fn();
    // Render the component with props indicating it should be in edit mode
    render(
      <CondoInfoField
        label="Label"
        value="Editable"
        isEditMode={true}
        onChange={mockOnChange}
        name="field"
      />
    );

    // Find the input element by its display value and assert it's in the document
    const input = screen.getByDisplayValue("Editable");
    expect(input).toBeInTheDocument();

    // Simulate a change event on the input and assert the mockOnChange was called exactly once
    fireEvent.change(input, { target: { value: "Changed" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
