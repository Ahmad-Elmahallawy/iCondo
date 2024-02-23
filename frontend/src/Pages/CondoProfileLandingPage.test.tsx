import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import userEvent from "@testing-library/user-event";
import CondoProfileLandingPage from "./CondoProfileLandingPage";
import "@testing-library/jest-dom";

describe("CondoProfileLandingPage", () => {
  test("renders with initial condo info", () => {
    render(
      <MemoryRouter>
        <CondoProfileLandingPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Condo Profile")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  test("updates info on form save", async () => {
    render(
      <MemoryRouter>
        <CondoProfileLandingPage />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByText("Edit"));

    const occupantNameInput = await screen.findByDisplayValue("Jane Doe");
    await userEvent.clear(occupantNameInput);
    await userEvent.type(occupantNameInput, "John Smith");

    await userEvent.click(screen.getByText("Save Changes"));


    expect(await screen.findByText("John Smith")).toBeInTheDocument();
  });
});
