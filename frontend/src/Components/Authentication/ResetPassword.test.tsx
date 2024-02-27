import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import ResetPassword from "./ResetPassword";

jest.mock("axios");

describe("ResetPassword Component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("reset password successfully with no err message", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        username: "john_doe",
        password: "1234567890",
        password_confirm: "1234567890",
      },
    });

    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "john_doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Reset"));

    expect(
      screen.queryByText("Password reset failed:")
    ).not.toBeInTheDocument();
  });
});
