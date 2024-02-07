import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./NavBar"; // Adjust the import path to your Navbar component
import "@testing-library/jest-dom";

// Mock modules
jest.mock("../Components/Common/AuthUtil", () => ({
  isAuthenticated: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Navbar", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("shows login and register links when not authenticated", () => {
    const { isAuthenticated } = require("../Components/Common/AuthUtil");
    isAuthenticated.mockReturnValue(false);

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.queryByText("My Profile")).toBeInTheDocument();
    expect(screen.queryByText("Log Out")).not.toBeInTheDocument();
  });

  it("shows logout and profile links when authenticated as a user", () => {
    const { isAuthenticated } = require("../Components/Common/AuthUtil");
    isAuthenticated.mockReturnValue(true);
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ token: "fake-token", role: "User" })
    );

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("Log Out")).toBeInTheDocument();
    expect(screen.getByText("My Profile")).toBeInTheDocument();
    expect(screen.queryByText("Log In")).not.toBeInTheDocument();
    expect(screen.queryByText("Register")).not.toBeInTheDocument();
  });

  it("shows logout, profile, and register employees links when authenticated as an admin", () => {
    const { isAuthenticated } = require("../Components/Common/AuthUtil");
    isAuthenticated.mockReturnValue(true);
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({ token: "fake-token", role: "Admin" })
    );

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("Log Out")).toBeInTheDocument();
    expect(screen.getByText("My Profile")).toBeInTheDocument();
    expect(screen.getByText("Register Employees")).toBeInTheDocument();
    expect(screen.queryByText("Log In")).not.toBeInTheDocument();
    expect(screen.queryByText("Register")).not.toBeInTheDocument();
  });


});

