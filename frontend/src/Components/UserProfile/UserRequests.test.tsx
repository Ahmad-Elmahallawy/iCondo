import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Requests from "./UserRequests";

describe("Requests Component", () => {
  test("renders request details correctly", () => {
    render(<Requests />);
    const header = screen.getByRole("heading", { name: /Requests/i });
    const description = screen.getByText(/leaky faucet in my unit, 305/i);
    expect(header).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test("initially renders default request description", () => {
    render(<Requests />);
    const defaultDescription = screen.getByText(/I hope you're well/i);
    expect(defaultDescription).toBeInTheDocument();
  });

});
