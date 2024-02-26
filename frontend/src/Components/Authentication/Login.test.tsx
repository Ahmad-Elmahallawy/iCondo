import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Login from "./LogIn"; // Import the Login component
import { BrowserRouter } from "react-router-dom";

jest.mock("axios"); // Mock the axios module

describe("Login component", () => {
  const setup = () => render(<Login />, { wrapper: BrowserRouter }); // Setup function to render the Login component

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  // Test case: Render Login Form
  it("renders login form", () => {
    setup();

    // Assert that the login form is rendered correctly
    expect(screen.getByPlaceholderText("username")).not.toBeNull();
    expect(screen.getByPlaceholderText("Password")).not.toBeNull();
    expect(screen.getByText("Log in")).not.toBeNull();
  });

  // Test case: Submit Form Successfully
  it("submits form successfully", async () => {
    // Mock a successful response from axios.post
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        name: "user",
      },
    });

    setup();

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "test123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    // Click the login button
    fireEvent.click(screen.getByText("Log in"));

    // Wait for the form submission
    await waitFor(() => {
      // Assert that user data is stored in localStorage after submission
      expect(localStorage.getItem("userData")).toBeDefined();
    });
  });

  // Test case: Submit Invalid Username
  it("submits invalid username address", async () => {
    // Define the error message expected for an invalid username
    const errorMessage = /Must be 20 characters or less/i;

    setup();

    // Simulate user input with an invalid username
    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: {
        value: "12dsssssssssssssssssssssssssssssssssssssssssssssscfdfdfdfdf",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    // Trigger blur event on the username input
    fireEvent.blur(screen.getByPlaceholderText("username"));

    // Wait for the error message to be displayed
    await waitFor(() => {
      // Assert that the correct error message is displayed
      expect(screen.getByText(errorMessage)).not.toBeNull();
    });
  });

  // Test case: Submit Invalid Password
  it("submits invalid password", async () => {
    // Define the error message expected for an invalid password
    const errorMessage = /Password must be at least 8 characters long/i;

    setup();

    // Simulate user input with an invalid password
    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "1" },
    });

    // Trigger blur event on the password input
    fireEvent.blur(screen.getByPlaceholderText("Password"));

    // Wait for the error message to be displayed
    await waitFor(() => {
      // Assert that the correct error message is displayed
      expect(screen.getByText(errorMessage)).not.toBeNull();
    });
  });

  // Test case: Handle Login Failure
  it("handles login failure", async () => {
    // Define the error message expected for a failed login attempt
    const errorMessage = /Username or Password is not correct/i;

    // Mock a rejected response from axios.post
    (axios.post as jest.Mock).mockRejectedValue({
      response: {
        data: { message: errorMessage },
        status: 401,
      },
    });

    setup();

    // Simulate user input for an invalid username and password
    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "invalidpassword" },
    });

    // Click the login button
    fireEvent.click(screen.getByText("Log in"));

    // Wait for the error message to be displayed
    await waitFor(() => {
      // Assert that the correct error message is displayed
      expect(screen.getByText(errorMessage)).not.toBeNull();
    });
  });
});
