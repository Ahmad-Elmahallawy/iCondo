import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PropertyInfoField from "./PropertyInfoField";
import "@testing-library/jest-dom";

describe("PropertyInfoField", () => {
  test("displays value in read mode", () => {
    render(
      <PropertyInfoField
        label="Label"
        value="Value"
        isEditMode={false}
        onChange={() => {}}
        name="field"
      />
    );
    expect(screen.getByText("Label:")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
  });

  test("displays input in edit mode", () => {
    const mockOnChange = jest.fn();
    render(
      <PropertyInfoField
        label="Label"
        value="Editable"
        isEditMode={true}
        onChange={mockOnChange}
        name="field"
      />
    );
    const input = screen.getByDisplayValue("Editable");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Changed" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
