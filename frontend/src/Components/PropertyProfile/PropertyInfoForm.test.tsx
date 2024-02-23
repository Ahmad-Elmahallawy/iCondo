import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropertyInfoForm from "./PropertyInfoForm";
import "@testing-library/jest-dom";

describe("PropertyInfoForm", () => {
  const initialProperty = {
    id: 1,
    title: "Windcreek Villa",
    address: "123 Main Street, Cityville",
    unitCount: "50",
    parkingSpotCount: "100",
    lockerCount: "25",
    imageUrl: "Assets/property1.png",
  };

  test("edit and save changes", async () => {
    const mockOnSave = jest.fn();
    render(<PropertyInfoForm propertyInfo={initialProperty} onSave={mockOnSave} />);

    // Assuming there is a button that toggles the edit mode
    await userEvent.click(screen.getByRole("button", { name: /Edit/i }));

    // First, find the input field for the title
    const titleInput = screen.getByDisplayValue("Windcreek Villa");

    // Clear the input field before typing the new value
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Stormcreek Villa");

    // Assuming there is a save button to submit changes
    await userEvent.click(
      screen.getByRole("button", { name: /Save Changes/i })
    );

    // Check if the mockOnSave was called with the updated title
    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Stormcreek Villa" })
    );
  });
});
