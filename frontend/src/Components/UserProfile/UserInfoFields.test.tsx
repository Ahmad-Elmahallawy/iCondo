import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserInfoFields from "./UserInfoFields";

const mockHandleChange = jest.fn();

describe("Renders information correctly", () => {
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
    jest.clearAllMocks();
  });

  it("renders user information correctly", () => {
    render(
      <UserInfoFields
        data={mockData}
        editMode={false}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Last Name:")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Phone Number:")).toBeInTheDocument();
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
  });

  it("Editing and handleChange was called", () => {
    render(
      <UserInfoFields
        data={mockData}
        editMode={true}
        handleChange={mockHandleChange}
      />
    );

    // Change the input field
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "newUsername" },
    });
    fireEvent.change(screen.getByLabelText("First Name:"), {
      target: { value: "new first name" },
    });
    fireEvent.change(screen.getByLabelText("Last Name:"), {
      target: { value: "new last name" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "new email" },
    });
    fireEvent.change(screen.getByLabelText("Phone Number:"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "123" },
    });
    expect(mockHandleChange).toHaveBeenCalledTimes(6);
  });
});
