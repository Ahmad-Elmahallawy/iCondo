import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import axios from "axios"; // Mocking Axios
import UserInformation from "./UserInformation";
import urls from "../../urls";

jest.mock("axios");

describe("UserInformation Component", () => {
  const mockData = {
    profilePicture: null,
    username: "testuser",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    password: "password123",
    id: 123,
  };

  beforeEach(() => {
    render(<UserInformation data={mockData} />);
  });

  test("renders user information correctly", () => {
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Last Name:")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
  });

  test("clicking Edit button enables edit mode", () => {
    fireEvent.click(screen.getByText("Edit"));

    // Now that edit mode is triggered, you can interact with the input fields
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByDisplayValue("testuser")).toBeInTheDocument();
  });

  test("clicking Save button updates user details", async () => {
    // Mock the axios.patch and axios.post calls
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: {} });
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: {} });

    // Trigger the edit mode
    fireEvent.click(screen.getByText("Edit"));

    // Change the input field
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "newUsername" },
    });

    // Trigger the Save button click
    fireEvent.click(screen.getByText("Save Changes"));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Assertions for axios.patch
      expect(axios.patch).toHaveBeenCalledWith(
        `${urls.users.updateUserDetails}`,
        expect.objectContaining({
          username: "newUsername",
        }),
        expect.any(Object)
      );
    });
  });
});

describe("UserInformation Component", () => {
  const mockData = {
    profilePicture: null,
    username: "testuser",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    password: "password123",
    id: 123,
  };

  beforeEach(() => {
    render(<UserInformation data={mockData} />);
  });

  test("renders user information correctly", () => {
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Last Name:")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
  });

  test("clicking Edit button enables edit mode", () => {
    fireEvent.click(screen.getByText("Edit"));

    // Now that edit mode is triggered, you can interact with the input fields
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByDisplayValue("testuser")).toBeInTheDocument();
  });

  test("clicking Save button updates user details", async () => {
    // Mock the axios.patch and axios.post calls
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: {} });
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: {} });

    // Trigger the edit mode
    fireEvent.click(screen.getByText("Edit"));

    // Change the input field
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "newUsername" },
    });

    // Trigger the Save button click
    fireEvent.click(screen.getByText("Save Changes"));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Assertions for axios.patch
      expect(axios.patch).toHaveBeenCalledWith(
        `${urls.users.updateUserDetails}`,
        expect.objectContaining({
          username: "newUsername",
        }),
        expect.any(Object)
      );
    });
  });

  test("clicking Cancel button exits edit mode without saving changes", () => {
    fireEvent.click(screen.getByText("Edit"));

    // Change the input field
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "newUsername" },
    });

    // Trigger the Cancel button click
    fireEvent.click(screen.getByText("Cancel"));

    // Verify that edit mode is exited
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.queryByLabelText("Username:")).toBeNull(); // Input field should not be present
  });
});
