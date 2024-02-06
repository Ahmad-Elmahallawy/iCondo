import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Login from "./LogIn";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

describe("Login component", () => {
  const setup = () => render(<Login />, { wrapper: BrowserRouter });

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it("renders login form", () => {
    setup();

    expect(screen.getByPlaceholderText("Email")).not.toBeNull();
    expect(screen.getByPlaceholderText("Password")).not.toBeNull();
    expect(screen.getByText("Log in")).not.toBeNull();
  });

  it("submits form successfully", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        name: "user",
      },
    });

    setup();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("Log in"));

    await waitFor(() => {
      expect(localStorage.getItem("userData")).toBeDefined();
    });
  });

  it("submits invalid email addr", async () => {
    const errorMessage = /Invalid Email Address/i;

    setup();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "12" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.focusOut(screen.getByPlaceholderText("Email"));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).not.toBeNull();
    });
  });

  it("submits invalid password", async () => {
    const errorMessage = /Password must be at least 8 characters long/i;

    setup();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "1" },
    });

    fireEvent.focusOut(screen.getByPlaceholderText("Password"));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).not.toBeNull();
    });
  });

  it("handles login failure", async () => {
    const errorMessage = /Email or Password is not correct/i;
    (axios.get as jest.Mock).mockRejectedValue({
      response: {
        data: { message: errorMessage },
        status: 401,
      },
    });

    setup();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "invalidpassword" },
    });

    fireEvent.click(screen.getByText("Log in"));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).not.toBeNull();
    });
  });
});
