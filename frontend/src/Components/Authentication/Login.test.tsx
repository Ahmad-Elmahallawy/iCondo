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

    expect(screen.getByPlaceholderText("username")).not.toBeNull();
    expect(screen.getByPlaceholderText("Password")).not.toBeNull();
    expect(screen.getByText("Log in")).not.toBeNull();
  });

  it("submits form successfully", async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        name: "user",
      },
    });

    setup();

    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "test123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("Log in"));

    await waitFor(() => {
      expect(localStorage.getItem("userData")).toBeDefined();
    });
  });

  it("submits invalid username address", async () => {
    const errorMessage = /Must be 20 characters or less/i;

    setup();

    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "12dsssssssssssssssssssssssssssssssssssssssssssssscfdfdfdfdf" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.blur(screen.getByPlaceholderText("username")); // Using blur instead of focusOut

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).not.toBeNull();
    });
  });

  it("submits invalid password", async () => {
    const errorMessage = /Password must be at least 8 characters long/i;

    setup();

    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "1" },
    });

    fireEvent.blur(screen.getByPlaceholderText("Password")); // Using blur instead of focusOut

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).not.toBeNull();
    });
  });

  it("handles login failure", async () => {
    const errorMessage = /Username or Password is not correct/i;
    (axios.post as jest.Mock).mockRejectedValue({
      response: {
        data: { message: errorMessage },
        status: 401,
      },
    });

    setup();

    fireEvent.change(screen.getByPlaceholderText("username"), {
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
