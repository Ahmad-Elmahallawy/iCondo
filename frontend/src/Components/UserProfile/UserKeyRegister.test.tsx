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
      target: { value: "12345678" },
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
      await screen.findByText("Error registering key")
    ).toBeInTheDocument();
  });
});
