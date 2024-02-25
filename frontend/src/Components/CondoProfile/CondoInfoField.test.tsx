import React from "react"; // Imports necessary functions from React and testing utilities
import { render, screen, fireEvent } from "@testing-library/react";
import CondoInfoField from "./CondoInfoField"; // Imports the component to be tested
import "@testing-library/jest-dom"; // Imports jest-dom for custom matchers to test the DOM

// Describes a test suite for the CondoInfoField component
describe("CondoInfoField", () => {
  // Test case for ensuring the component correctly displays its value in read-only mode
  test("displays value in read mode", () => {
    // Renders the CondoInfoField component with props indicating it should be in read-only mode
    render(
      <CondoInfoField
        label="Label"
        value="Value"
        isEditMode={false}
        onChange={() => {}}
        name="field"
      />
    );
    // Asserts that the label and value are correctly displayed in the document
    expect(screen.getByText("Label:")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
  });

  // Test case for ensuring the component displays an input element when in edit mode
  test("displays input in edit mode", () => {
    // Mock function to simulate the onChange handler
    const mockOnChange = jest.fn();
    // Renders the component in edit mode with the mock onChange handler
    render(
      <CondoInfoField
        label="Label"
        value="Editable"
        isEditMode={true}
        onChange={mockOnChange}
        name="field"
      />
    );
    // Finds the input by its display value
    const input = screen.getByDisplayValue("Editable");
    // Asserts that the input element is present
    expect(input).toBeInTheDocument();
    // Simulates a change event on the input and checks if the mockOnChange function was called
    fireEvent.change(input, { target: { value: "Changed" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
