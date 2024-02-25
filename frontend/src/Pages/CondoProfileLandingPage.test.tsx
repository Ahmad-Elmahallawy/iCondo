import React from "react"; // Import React and necessary testing utilities
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // MemoryRouter is used for components that use routing
import userEvent from "@testing-library/user-event"; // userEvent for simulating user interactions
import CondoProfileLandingPage from "./CondoProfileLandingPage"; // The component under test
import "@testing-library/jest-dom"; // Additional Jest matchers for DOM elements

// Test suite for CondoProfileLandingPage
describe("CondoProfileLandingPage", () => {
  // Test case for verifying that the landing page renders with initial condo info
  test("renders with initial condo info", () => {
    // Renders the component within a MemoryRouter to mimic app's routing environment
    render(
      <MemoryRouter>
        <CondoProfileLandingPage />
      </MemoryRouter>
    );
    // Asserts that specific texts, which indicate successful rendering, are present in the document
    expect(screen.getByText("Condo Profile")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  // Test case for verifying that the form updates info upon save
  test("updates info on form save", async () => {
    // Re-renders the component for this specific test
    render(
      <MemoryRouter>
        <CondoProfileLandingPage />
      </MemoryRouter>
    );

    // Simulates user clicking the "Edit" button to enable form editing
    await userEvent.click(screen.getByText("Edit"));

    // Finds the input element by its initial value, simulates clearing it, and typing a new value
    const occupantNameInput = await screen.findByDisplayValue("Jane Doe");
    await userEvent.clear(occupantNameInput);
    await userEvent.type(occupantNameInput, "John Smith");

    // Simulates user clicking the "Save Changes" button to submit the form
    await userEvent.click(screen.getByText("Save Changes"));

    // Asserts that the updated information is displayed, indicating successful form submission
    expect(await screen.findByText("John Smith")).toBeInTheDocument();
  });
});
