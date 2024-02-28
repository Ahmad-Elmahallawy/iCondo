import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";

import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import KeyGeneration from "./KeyGeneration";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe("KeyGeneration component", () => {
  it("renders with default registration key", () => {
    const { getByText } = render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );
    expect(getByText("No Key To Show Right Now")).toBeInTheDocument();
  });

  it("renders two buttons for condo owner and rental user", () => {
    const { getByText } = render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );
    expect(getByText("Condo Owner")).toBeInTheDocument();
    expect(getByText("Rental User")).toBeInTheDocument();
  });

  it("renders a button to generate registration key", () => {
    const { getByText } = render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );
    expect(getByText("Generate Registration Key")).toBeInTheDocument();
  });

  it("updates registration key on generate key click", async () => {
    const { getByText, findByText } = render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );
    const generateKeyButton = getByText("Generate Registration Key");

    const previousKey = getByText("No Key To Show Right Now").textContent;

    generateKeyButton.click();

    // Wait for the key to be updated asynchronously
    const currentKeyElement = await findByText("No Key To Show Right Now");
    const currentKey = currentKeyElement.textContent;

    expect(currentKey).not.toEqual(previousKey);
  });

  it("highlights selected user type button", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );
    const condoOwnerButton = getByText("Condo Owner");
    const rentalUserButton = getByText("Rental User");

    fireEvent.click(condoOwnerButton); // Simulate click event

    await waitFor(() => {
      expect(condoOwnerButton).toHaveClass("selected");
      expect(rentalUserButton).not.toHaveClass("selected");
    });

    fireEvent.click(rentalUserButton); // Simulate click event

    await waitFor(() => {
      expect(rentalUserButton).toHaveClass("selected");
      expect(condoOwnerButton).not.toHaveClass("selected");
    });
  });
});

describe("KeyGeneration", () => {
  beforeEach(() => {
    // Reset the mocked axios implementation before each test
    jest.clearAllMocks();
  });

  test("fetches registration key on component mount", async () => {
    // Mock axios.get to return data with registration key
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: [{ value: "testKey" }],
    });
    const mockToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM1LCJ1c2VybmFtZSI6ImNvbXBhbnlCIiwiaWF0IjoxNzA5MDU1MTIxLCJleHAiOjE3MDkyMjc5MjF9.ZHGC0un1A8G0n5uPCXk08c95_rzlTiV3lUX7jpG-3tY";
    localStorage.setItem(
      "userData",
      JSON.stringify({ accessToken: mockToken })
    );
    render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );

    // Check if axios.get is called with the correct parameters
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8000/api/registrationKeys",
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
        params: {
          where: {
            condoUnit: {
              id: "",
            },
          },
        },
      }
    );

    // Check if the registration key is rendered after fetching
    await waitFor(() => {
      expect(screen.getByText("testKey")).toBeInTheDocument();
    });
  });

  test("handles user type selection", () => {
    render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );

    // Click on the "Rental User" button
    fireEvent.click(screen.getByText("Rental User"));

    // Check if the user type is updated
    expect(screen.getByText("Rental User").classList.contains("selected")).toBe(
      true
    );
  });

  test("generates registration key and handles key submission", async () => {
    // Mock axios.post to simulate successful key generation
    (axios.post as jest.Mock).mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <KeyGeneration />
      </MemoryRouter>
    );

    // Click on the "Generate Registration Key" button
    fireEvent.click(screen.getByText("Generate Registration Key"));
    const mockToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM1LCJ1c2VybmFtZSI6ImNvbXBhbnlCIiwiaWF0IjoxNzA5MDU1MTIxLCJleHAiOjE3MDkyMjc5MjF9.ZHGC0un1A8G0n5uPCXk08c95_rzlTiV3lUX7jpG-3tY";
    localStorage.setItem(
      "userData",
      JSON.stringify({ accessToken: mockToken })
    );

    // Check if axios.post is called with the correct parameters
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8000/api/registrationKeys",
      {
        condoUnit: {
          id: "",
        },
        value: "No Key To Show Right Now",
        role: ["condoOwner"],
      },
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      }
    );

    // Check if success message is displayed after key generation
    await waitFor(() => {
      expect(
        screen.getByText("Key was added successfully")
      ).toBeInTheDocument();
    });
  });
});
