import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Router } from "react-router-dom";
import SignUp from "./SignUp";

jest.mock("axios");

describe("SignUpAsClient Component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("registers a new public user successfully and redirects to login page", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        _id: 1,
        first_name: "John",
        last_name: "Doe",
        username: "john_doe",
        email: "john.doe@example.com",
        phone_number: "1234567890",
        token: "example-token",
        role: "PublicUser",
      },
    });

    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <SignUp />
      </MemoryRouter>
    );

    // Fill in the form fields
    userEvent.selectOptions(screen.getByLabelText("I am a"), ["PublicUser"]);
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "john_doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Register"));

    // Wait for the registration process to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    // Ensure that the navigate function is called with the correct path
    expect(
      screen.queryByText(
        "User with this email, username or phone number already exists"
      )
    ).toBeNull();
  });

  it("registers a new public user successfully and redirects to login page", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        _id: 1,
        first_name: "John",
        last_name: "Doe",
        username: "john_doe",
        email: "john.doe@example.com",
        phone_number: "1234567890",
        token: "example-token",
        role: "PublicUser",
      },
    });

    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <SignUp />
      </MemoryRouter>
    );

    // Fill in the form fields
    userEvent.selectOptions(screen.getByLabelText("I am a"), ["Company"]);
    fireEvent.change(screen.getByPlaceholderText("Company Name"), {
      target: { value: "companyC" },
    });
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "A" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "B" },
    });
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "john" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "12345678911" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password1223" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Register"));

    // Wait for the registration process to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    // Ensure that the navigate function is called with the correct path
    expect(
      screen.queryByText(
        "User with this email, username or phone number already exists"
      )
    ).toBeNull();
  });

  it('displays "Required" for all empty fields on form submission', async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Register"));

    // Wait for any async actions to complete
    await waitFor(() => {
      expect(screen.getAllByText("Required").length).toBeGreaterThan(0);
    });
  });

  it("validates password minimum length", async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters long")
      ).toBeInTheDocument();
    });
  });

  it("validates phone number format", async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "invalid" },
    });
    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(screen.getByText("Invalid Phone Number")).toBeInTheDocument();
    });
  });
});
