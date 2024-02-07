import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import EmployeeRegistration from "./EmployeeRegistration";

jest.mock("axios");

describe("EmployeeRegistration Component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <EmployeeRegistration />
      </MemoryRouter>
    );
    expect(screen.getByText("Register Employee")).toBeInTheDocument();
  });

  it("registers a new employee with role 'Manager' successfully and displays success message", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        _id: 1,
        first_name: "John",
        last_name: "Doe",
        username: "john_doe",
        email: "john.doe@example.com",
        phone_number: "1234567890",
        token: "example-token",
        role: "Manager",
      },
    });

    render(
      <MemoryRouter initialEntries={["/employee-registration"]}>
        <EmployeeRegistration />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Employee's Role is"), {
      target: { value: "Manager" },
    });

    fireEvent.change(screen.getByPlaceholderText("Company Name"), {
      target: { value: "Example Company" },
    });
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

    fireEvent.click(screen.getByText("Register Employee"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText("Employee Added Successfully")).toBeInTheDocument();
  });

  it("fails to register a new employee when server responds with status code  400", async () => {
    // Mock the axios.post method to reject with a  400 status code
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 400,
      },
    });

    render(
      <MemoryRouter initialEntries={["/employee-registration"]}>
        <EmployeeRegistration />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Employee's Role is"), {
      target: { value: "Finance Manager" },
    });

    fireEvent.change(screen.getByPlaceholderText("Company Name"), {
      target: { value: "Example Company" },
    });
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

    fireEvent.click(screen.getByText("Register Employee"));

    // Wait for the error message to appear in the document
    await waitFor(() => {
      expect(
        screen.getByText(
          "User with this email, username or phone number already exists OR Company does not Exist"
        )
      ).toBeInTheDocument();
    });
  });

  it("registers a new employee with role 'FinanceManager' successfully and displays success message", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        _id: 2,
        first_name: "Jakees",
        last_name: "Doe",
        username: "Jakees_doe",
        email: "Jakees.doe@example.com",
        phone_number: "1234567889",
        token: "example-token",
        role: "FinanceManager",
      },
    });

    render(
      <MemoryRouter initialEntries={["/employee-registration"]}>
        <EmployeeRegistration />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Employee's Role is"), {
      target: { value: "FinanceManager" },
    });

    fireEvent.change(screen.getByPlaceholderText("Company Name"), {
      target: { value: "Com" },
    });
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Jakees" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "Jakees_doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "Jakees.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567889" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Register Employee"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(3);
    });

    expect(screen.getByText("Employee Added Successfully")).toBeInTheDocument();
  });

  it("registers a new employee with role 'Operator' successfully and displays success message", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        _id: 3,
        first_name: "ope",
        last_name: "Doe",
        username: "ope_doe",
        email: "ope.doe@example.com",
        phone_number: "12345678893",
        token: "example-token",
        role: "Operator",
      },
    });

    render(
      <MemoryRouter initialEntries={["/employee-registration"]}>
        <EmployeeRegistration />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Employee's Role is"), {
      target: { value: "Operator" },
    });

    fireEvent.change(screen.getByPlaceholderText("Company Name"), {
      target: { value: "Comp" },
    });
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "ope" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "ope_doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "ope.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "12345678893" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Register Employee"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(4);
    });

    expect(screen.getByText("Employee Added Successfully")).toBeInTheDocument();
  });
});
