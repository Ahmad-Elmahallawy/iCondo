import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import KeyGeneration from "./KeyGeneration";

describe("KeyGeneration component", () => {
  it("renders with default registration key", () => {
    const { getByText } = render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );
    expect(getByText("No Key To Show Right Now")).toBeInTheDocument();
  });

  it("renders two buttons for condo owner and rental user", () => {
    const { getByText } = render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );
    expect(getByText("Condo Owner")).toBeInTheDocument();
    expect(getByText("Rental User")).toBeInTheDocument();
  });

  it("renders a button to generate registration key", () => {
    const { getByText } = render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );
    expect(getByText("Generate Registration Key")).toBeInTheDocument();
  });

  it("updates registration key on generate key click", async () => {
    const { getByText, findByText } = render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );
    const generateKeyButton = getByText("Generate Registration Key");

    const previousKey = getByText("No Key To Show Right Now").textContent;

    generateKeyButton.click();

    // Wait for the key to be updated asynchronously
    const currentKeyElement = await findByText("No Key To Show Right Now");
    const currentKey = currentKeyElement.textContent;

    expect(currentKey).not.toEqual(previousKey);
  });

  it("highlights selected user type button", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );
    const condoOwnerButton = getByText("Condo Owner");
    const rentalUserButton = getByText("Rental User");

    fireEvent.click(condoOwnerButton); // Simulate click event

    await waitFor(() => {
      expect(condoOwnerButton).toHaveClass("selected");
      expect(rentalUserButton).not.toHaveClass("selected");
    });

    fireEvent.click(rentalUserButton); // Simulate click event

    await waitFor(() => {
      expect(rentalUserButton).toHaveClass("selected");
      expect(condoOwnerButton).not.toHaveClass("selected");
    });
  });
});
