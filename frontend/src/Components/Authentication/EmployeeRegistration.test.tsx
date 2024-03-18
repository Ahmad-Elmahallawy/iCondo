import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import EmployeeRegistration from "./EmployeeRegistration";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("EmployeeRegistration Component", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === "userData") {
        return JSON.stringify({ accessToken: "test-token" });
      }
      if (key === "companyDetails") {
        return JSON.stringify([{ id: 1 }]);
      }
      return null;
    });

    mockedAxios.post.mockReset();
  });

  it("renders without crashing", async () => {
    render(
      <MemoryRouter>
        <EmployeeRegistration />
      </MemoryRouter>
    );
    expect(
      await screen.findByRole("button", { name: /register employee/i })
    ).toBeInTheDocument();
  });

  async function fillAndSubmitForm(role: string) {
    await userEvent.selectOptions(screen.getByRole("combobox"), role);
    await userEvent.type(
      screen.getByPlaceholderText("First Name"),
      "TestFirstName"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Last Name"),
      "TestLastName"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Username"),
      "TestUsername"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "test@example.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Phone Number"),
      "1234567890"
    );
    await userEvent.type(screen.getByPlaceholderText("Password"), "password");
    await userEvent.click(
      screen.getByRole("button", { name: /register employee/i })
    );
  }

  it.each([
    ["Manager", 1],
    ["Operator", 2],
    ["Finance Manager", 3],
  ])(
    "registers a new employee with role '%s' successfully and displays success message",
    async (role, userId) => {
      mockedAxios.post
        .mockResolvedValueOnce({
          data: {
            id: userId,
            first_name: "TestFirstName",
            last_name: "TestLastName",
            username: "TestUsername",
            email: "test@example.com",
            phone_number: "1234567890",
            role,
          },
        })
        .mockResolvedValueOnce({ data: {} });

      render(
        <MemoryRouter>
          <EmployeeRegistration />
        </MemoryRouter>
      );

      await fillAndSubmitForm(role);

      await waitFor(() => {
        expect(
          screen.getByText("Employee Added Successfully")
        ).toBeInTheDocument();
      });
    }
  );

  it("fails to register a new employee when server responds with status code 400", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        status: 400,
        data: "User with this email, username or phone number already exists OR Company does not Exist",
      },
    });

    render(
      <MemoryRouter>
        <EmployeeRegistration />
      </MemoryRouter>
    );

    await fillAndSubmitForm("Manager");

    await waitFor(() => {
      expect(
        screen.getByText(
          "User with this email, username or phone number already exists OR Company does not Exist"
        )
      ).toBeInTheDocument();
    });
  });
});
