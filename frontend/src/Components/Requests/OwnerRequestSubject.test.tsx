import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import OwnerRequestSubject from "./OwnerRequestSubject";

// Mocking axios
jest.mock("axios");

describe("OwnerRequestSubject", () => {

  it("fetches and displays data correctly", async () => {
    const mockData = [
      { requestType: "Moving In/Out" },
      { requestType: "Intercom Changes" },
    ];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<OwnerRequestSubject />);

    await waitFor(() => {
      expect(screen.getByText(/Moving In\/Out/i)).toBeInTheDocument();
      expect(screen.getByText(/Intercom Changes/i)).toBeInTheDocument();
    });
  });
});
