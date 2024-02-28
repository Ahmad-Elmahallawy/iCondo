import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import urls from "../../urls";

jest.mock("axios");

// Arrange
const values = {
  username: "username",
  password: "password123",
  password_confirm: "password123",
};

describe("ResetPassword Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
      data: values,
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

  it('displays "Required" for all empty fields on form submission', async () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Reset"));

    // Wait for any async actions to complete
    await waitFor(() => {
      expect(screen.getAllByText("Required").length).toBeGreaterThan(2);
    });
  });

  it("validates username max length", async () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "internationalisations" },
    });
    fireEvent.click(screen.getByText("Reset"));

    await waitFor(() => {
      expect(
        screen.getByText("Must be 20 characters or less")
      ).toBeInTheDocument();
    });
  });

  it("validates password minimum length", async () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByText("Reset"));

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters long")
      ).toBeInTheDocument();
    });
  });

  it("clicking reset button calls correct api endpoint", async () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    // Mock the axios.patch
    (axios.patch as jest.Mock)
      .mockResolvedValueOnce({ data: {} })
      .mockRejectedValueOnce(new Error("Async error message"));

    // Change the input field
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "username" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });

    // Trigger the Save button click
    fireEvent.click(screen.getByText("Reset"));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Assertions for axios.patch
      expect(axios.patch).toHaveBeenCalledWith(
        `${urls.users.resetUserPassword}`,
        values,
        { headers: { "Content-Type": "application/json" } }
      );
    });
  });

  it("api failure", async () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    const error = new Error("Reset password failed");

    // Mock resetPassword function to throw an error
    (axios.patch as jest.Mock).mockRejectedValueOnce(error);

    // Change the input field
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "username" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });

    // Act
    // Trigger the Save button click
    fireEvent.click(screen.getByText("Reset"));

    // Assert
    await waitFor(() => {
      // Assertions for axios.patch
      expect(axios.patch).toHaveBeenCalledWith(
        `${urls.users.resetUserPassword}`,
        values,
        { headers: { "Content-Type": "application/json" } }
      );
    });
    expect(screen.getByText("Password reset failed:")).toBeInTheDocument();
  });
});
