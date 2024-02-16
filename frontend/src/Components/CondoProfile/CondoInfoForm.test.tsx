import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CondoInfoForm from "./CondoInfoForm";
import "@testing-library/jest-dom"; // Ensure this import is here

describe("CondoInfoForm", () => {
  const initialInfo = {
    condoId: "1",
    netArea: "100",
    occupantName: "John Doe",
    parkingSpotCount: "2",
    lockerCount: "1",
    bathrooms: "2",
    bedrooms: "3",
    condoType: "Apartment",
    lastRenovated: "2020",
  };

  test("edit and save changes", async () => {
    const mockOnSave = jest.fn();
    render(<CondoInfoForm condoInfo={initialInfo} onSave={mockOnSave} />);

    // Assuming there is a button that toggles the edit mode
    await userEvent.click(screen.getByRole("button", { name: /Edit/i }));

    // First, find the input field for the occupant's name
    const occupantNameInput = screen.getByDisplayValue("John Doe");

    // Clear the input field before typing the new value
    await userEvent.clear(occupantNameInput);
    await userEvent.type(occupantNameInput, "Jane Doe");

    // Assuming there is a save button to submit changes
    await userEvent.click(
      screen.getByRole("button", { name: /Save Changes/i })
    );

    // Check if the mockOnSave was called with the updated occupantName
    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({ occupantName: "Jane Doe" })
    );
  });
});
