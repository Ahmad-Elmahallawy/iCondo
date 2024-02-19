import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LandingPage from "./CondoProfileLandingPage";
import "@testing-library/jest-dom";

describe("CondoProfileLandingPage", () => {
  test("renders with initial condo info", () => {
    render(<LandingPage />);
    expect(screen.getByText("Condo Profile")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  test("updates info on form save", async () => {
    render(<LandingPage />);
    // Make sure to render the component before trying to interact with it

    // Assuming you have an Edit button in your form
    await userEvent.click(screen.getByText("Edit"));

    // Assuming "occupantName" field can be edited
    const occupantNameInput = await screen.findByDisplayValue("Jane Doe");
    await userEvent.clear(occupantNameInput);
    await userEvent.type(occupantNameInput, "John Smith");

    await userEvent.click(screen.getByText("Save Changes"));

    // This step assumes the component re-renders and displays the updated info
    // Make sure your component's state and rendering logic actually reflects the change
    expect(await screen.findByText("John Smith")).toBeInTheDocument();
  });
});
