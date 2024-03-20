/* eslint-disable testing-library/no-node-access */
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import urls from "../../urls";
import UserKeyRegister from "./UserKeyRegister";

jest.mock("axios");

describe("UserKeyRegister Component", () => {
  it("renders component correctly", () => {
    render(<UserKeyRegister />);
    expect(screen.getByText("Submit Registration Key")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("clicking submit button calls correct api endpoint", async () => {
    render(<UserKeyRegister />);

    // Mock the axios.patch
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: {} });

    const input = screen.getByTestId("registrationKey").querySelector("input");
    expect(input).toBeInTheDocument();
    // Change the input field
    fireEvent.change(input!, {
      target: { value: "" },
    });

    // Trigger the Save button click
    fireEvent.click(screen.getByText("Submit"));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Assertions for axios.patch
      expect(axios.get).toHaveBeenCalledWith(
        `${urls.registrationKeys.userRegister}`,
        {
          params: {
            where: {
              value: "",
            },
          },
        }
      );
    });
  });

  it("api failure", async () => {
    render(<UserKeyRegister />);

    const error = new Error("Reset password failed");

    // Mock resetPassword function to throw an error
    (axios.get as jest.Mock).mockRejectedValueOnce(error);

    // Act
    // Trigger the submit button click
    fireEvent.click(screen.getByText("Submit"));

    // Assert
    await waitFor(() => {
      // Assertions for axios.get
      expect(axios.get).toHaveBeenCalledWith(
        `${urls.registrationKeys.userRegister}`,
        {
          params: {
            where: {
              value: "",
            },
          },
        }
      );
    });
    expect(
      await screen.findByText("Error registering key: Reset password failed")
    ).toBeInTheDocument();
  });
});

jest.mock("axios");

describe("UserKeyRegister Component", () => {
  // Existing tests...

  it("successful key registration", async () => {
    render(<UserKeyRegister />);

    // Mock the axios.get calls
    (axios.get as jest.Mock)
      .mockResolvedValueOnce({
        data: [{ condoUnit: { id: "123" } }],
      })
      .mockResolvedValueOnce({
        data: [{ condoUnit: { id: "123" } }],
      });

    // Mock the axios.post call
    (axios.post as jest.Mock).mockResolvedValueOnce({});

    const input = screen.getByTestId("registrationKey").querySelector("input");
    fireEvent.change(input!, { target: { value: "testKey" } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(
        screen.getByText("Key registered successfully!")
      ).toBeInTheDocument();
    });
  });

  it("key not found or already registered", async () => {
    render(<UserKeyRegister />);

    // Mock the axios.get call to return an empty array
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    const input = screen.getByTestId("registrationKey").querySelector("input");
    fireEvent.change(input!, { target: { value: "testKey" } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Error registering key: Key not found or already registered"
        )
      ).toBeInTheDocument();
    });
  });

  it("condo ID not found in registration response", async () => {
    render(<UserKeyRegister />);

    // Mock the axios.get call to return a response without condoUnit.id
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [{}] });

    const input = screen.getByTestId("registrationKey").querySelector("input");
    fireEvent.change(input!, { target: { value: "testKey" } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Error registering key: Condo ID not found in registration response"
        )
      ).toBeInTheDocument();
    });
  });
});
