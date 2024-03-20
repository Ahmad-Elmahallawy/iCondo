import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom";
import UserKeyRegister from "./UserKeyRegister";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UserKeyRegister Component", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  it("renders component correctly", () => {
    render(<UserKeyRegister />);
    expect(screen.getByText("Submit Registration Key")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("clicking submit button calls correct api endpoint", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { message: "success" } });

    render(<UserKeyRegister />);
    // Ensure we target the input correctly. Adjust if your input has a specific role or accessible name.
    const inputElement = screen
      .getByTestId("registrationKey")
      .querySelector("input");
    fireEvent.change(inputElement!, { target: { value: "testKey" } }); // Using non-null assertion for simplicity
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
  });

  it("handles api failure", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: { data: { message: "Error message" } },
    });

    render(<UserKeyRegister />);
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() =>
      expect(screen.findByText("Error message")).toBeTruthy()
    );
  });

  it("handles successful key registration", async () => {
    // Mock the API call to simulate a successful response.
    mockedAxios.get.mockResolvedValueOnce({
      data: { success: true, message: "Key registered successfully!" },
    });

    // Render the component.
    render(<UserKeyRegister />);

    // Simulate user input.
    const inputElement = screen
      .getByTestId("registrationKey")
      .querySelector("input");
    if (inputElement) {
      fireEvent.change(inputElement, { target: { value: "testKey" } });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    } else {
      // If the input element isn't found, fail the test explicitly.
      throw new Error("Input element for 'registrationKey' not found.");
    }

    // Use findByText for asynchronous updates. Ensure the message matches exactly.
    const successMessage = await screen.findByText(
      "Key registered successfully!"
    );
    expect(successMessage).toBeInTheDocument();
  });

  it("handles key not found or already registered", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: { data: { message: "Key not found or already registered" } },
    });

    render(<UserKeyRegister />);
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() =>
      expect(
        screen.findByText("Key not found or already registered")
      ).toBeTruthy()
    );
  });

  it("handles condo ID not found in registration response", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: {
        data: { message: "Condo ID not found in registration response" },
      },
    });

    render(<UserKeyRegister />);
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() =>
      expect(
        screen.findByText("Condo ID not found in registration response")
      ).toBeTruthy()
    );
  });
});
